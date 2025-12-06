import express from 'express';
import { pool } from '../config/database.js';

const router = express.Router();

// Get currencies with exchange rates
router.get('/', async (req, res) => {
  try {
    const [currencies] = await pool.query(
      'SELECT * FROM currencies WHERE active = true ORDER BY is_default DESC, code ASC'
    );
    res.json({ currencies });
  } catch (error) {
    console.error('Get currencies error:', error);
    res.status(500).json({ error: 'Failed to fetch currencies' });
  }
});

// Get default currency
router.get('/default', async (req, res) => {
  try {
    const [currencies] = await pool.query(
      'SELECT * FROM currencies WHERE is_default = true LIMIT 1'
    );

    if (currencies.length === 0) {
      return res.status(404).json({ error: 'No default currency set' });
    }

    res.json({ currency: currencies[0] });
  } catch (error) {
    console.error('Get default currency error:', error);
    res.status(500).json({ error: 'Failed to fetch default currency' });
  }
});

// Convert price between currencies
router.post('/convert', async (req, res) => {
  try {
    const { amount, fromCurrency, toCurrency } = req.body;

    if (!amount || !fromCurrency || !toCurrency) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [currencies] = await pool.query(
      'SELECT code, exchange_rate FROM currencies WHERE code IN (?, ?) AND active = true',
      [fromCurrency, toCurrency]
    );

    if (currencies.length !== 2) {
      return res.status(400).json({ error: 'Invalid currency codes' });
    }

    const from = currencies.find(c => c.code === fromCurrency);
    const to = currencies.find(c => c.code === toCurrency);

    // Convert to USD first, then to target currency
    const usdAmount = amount / from.exchange_rate;
    const convertedAmount = usdAmount * to.exchange_rate;

    res.json({
      original: { amount, currency: fromCurrency },
      converted: { amount: parseFloat(convertedAmount.toFixed(2)), currency: toCurrency }
    });
  } catch (error) {
    console.error('Currency conversion error:', error);
    res.status(500).json({ error: 'Conversion failed' });
  }
});

export default router;

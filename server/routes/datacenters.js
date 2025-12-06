import express from 'express';
import { pool } from '../config/database.js';

const router = express.Router();

// Get all data centers
router.get('/', async (req, res) => {
  try {
    const [datacenters] = await pool.query(
      'SELECT * FROM datacenters WHERE active = true ORDER BY display_order ASC, name ASC'
    );
    res.json({ datacenters });
  } catch (error) {
    console.error('Get datacenters error:', error);
    res.status(500).json({ error: 'Failed to fetch data centers' });
  }
});

// Get data center by ID
router.get('/:id', async (req, res) => {
  try {
    const [datacenters] = await pool.query(
      'SELECT * FROM datacenters WHERE id = ? AND active = true',
      [req.params.id]
    );

    if (datacenters.length === 0) {
      return res.status(404).json({ error: 'Data center not found' });
    }

    res.json({ datacenter: datacenters[0] });
  } catch (error) {
    console.error('Get datacenter error:', error);
    res.status(500).json({ error: 'Failed to fetch data center' });
  }
});

export default router;

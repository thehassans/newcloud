import express from 'express';
import { pool } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id, email, first_name, last_name, phone, company, country, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: users[0] });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { firstName, lastName, phone, company, country } = req.body;

    await pool.query(
      'UPDATE users SET first_name = ?, last_name = ?, phone = ?, company = ?, country = ? WHERE id = ?',
      [firstName, lastName, phone || null, company || null, country || null, req.user.id]
    );

    const [users] = await pool.query(
      'SELECT id, email, first_name, last_name, phone, company, country FROM users WHERE id = ?',
      [req.user.id]
    );

    res.json({ message: 'Profile updated successfully', user: users[0] });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get user services
router.get('/services', authenticateToken, async (req, res) => {
  try {
    const [services] = await pool.query(
      `SELECT s.*, p.name as product_name, p.type as product_type 
       FROM services s 
       LEFT JOIN products p ON s.product_id = p.id 
       WHERE s.user_id = ? 
       ORDER BY s.created_at DESC`,
      [req.user.id]
    );

    res.json({ services });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Get user orders
router.get('/orders', authenticateToken, async (req, res) => {
  try {
    const [orders] = await pool.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );

    res.json({ orders });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get user invoices
router.get('/invoices', authenticateToken, async (req, res) => {
  try {
    const [invoices] = await pool.query(
      'SELECT * FROM invoices WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );

    res.json({ invoices });
  } catch (error) {
    console.error('Get invoices error:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

export default router;

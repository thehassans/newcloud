import express from 'express';
import { pool } from '../config/database.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all products with optional filtering
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { type, category, featured } = req.query;
    
    let query = 'SELECT * FROM products WHERE active = true';
    const params = [];

    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }

    if (category) {
      query += ' AND category_id = ?';
      params.push(category);
    }

    if (featured === 'true') {
      query += ' AND featured = true';
    }

    query += ' ORDER BY display_order ASC, created_at DESC';

    const [products] = await pool.query(query, params);
    res.json({ products });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get product by slug
router.get('/:slug', async (req, res) => {
  try {
    const [products] = await pool.query(
      'SELECT * FROM products WHERE slug = ? AND active = true',
      [req.params.slug]
    );

    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product: products[0] });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Get product categories
router.get('/categories/all', async (req, res) => {
  try {
    const [categories] = await pool.query(
      'SELECT * FROM product_categories WHERE active = true ORDER BY display_order ASC'
    );
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

export default router;

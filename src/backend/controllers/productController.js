import pool from '../database/db.js';

const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products;');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get products' });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params; // Get the id from the URL
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export { getAllProducts, getProductById };

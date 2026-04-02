const express        = require('express');
const router         = express.Router();
const bcrypt         = require('bcrypt');
const jwt            = require('jsonwebtoken');
const pool           = require('../db');
const requireOperator = require('../middleware/requireOperator');

const JWT_SECRET    = process.env.JWT_SECRET || 'trastero_secret_dev';
const TOKEN_EXPIRES = '8h';

// POST /api/ops/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Credenciales requeridas' });
  }

  try {
    const result = await pool.query(
      'SELECT id, nombre, email, password, activo FROM sys_operators WHERE email = $1',
      [email.toLowerCase().trim()]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const op = result.rows[0];

    if (!op.activo) {
      return res.status(403).json({ error: 'Cuenta desactivada' });
    }

    const valid = await bcrypt.compare(password, op.password);
    if (!valid) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Actualizar last_login
    await pool.query(
      'UPDATE sys_operators SET last_login = NOW() WHERE id = $1',
      [op.id]
    );

    const token = jwt.sign(
      { id: op.id, email: op.email, tipo: 'operator' },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES }
    );

    res.json({
      token,
      operator: { id: op.id, nombre: op.nombre, email: op.email }
    });
  } catch (err) {
    console.error('Error en POST /api/ops/login:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// GET /api/ops/usuarios  — listar usuarios (protegido)
router.get('/usuarios', requireOperator, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre, email, avatar_url, created_at FROM usuarios ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error en GET /api/ops/usuarios:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// GET /api/ops/stats  — estadísticas generales (protegido)
router.get('/stats', requireOperator, async (req, res) => {
  try {
    const [usuarios, trasteros] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM usuarios'),
      pool.query('SELECT COUNT(*) FROM trasteros')
    ]);
    res.json({
      usuarios:  parseInt(usuarios.rows[0].count),
      trasteros: parseInt(trasteros.rows[0].count)
    });
  } catch (err) {
    console.error('Error en GET /api/ops/stats:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;

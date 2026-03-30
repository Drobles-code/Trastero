const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const pool    = require('../db');

const JWT_SECRET    = process.env.JWT_SECRET || 'trastero_secret_dev';
const SALT_ROUNDS   = 10;
const TOKEN_EXPIRES = '7d';

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  try {
    const result = await pool.query(
      'SELECT id, nombre, email, password, avatar_url FROM usuarios WHERE email = $1',
      [email.toLowerCase().trim()]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    const usuario = result.rows[0];
    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES }
    );

    res.json({
      token,
      usuario: {
        id:        usuario.id,
        nombre:    usuario.nombre,
        email:     usuario.email,
        avatar_url: usuario.avatar_url,
      }
    });
  } catch (err) {
    console.error('Error en POST /api/auth/login:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// POST /api/auth/registro
router.post('/registro', async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Nombre, email y contraseña son requeridos' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
  }

  try {
    const existe = await pool.query(
      'SELECT id FROM usuarios WHERE email = $1',
      [email.toLowerCase().trim()]
    );

    if (existe.rows.length > 0) {
      return res.status(409).json({ error: 'Ya existe una cuenta con ese email' });
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`;

    const result = await pool.query(
      `INSERT INTO usuarios (nombre, email, password, avatar_url)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nombre, email, avatar_url`,
      [nombre.trim(), email.toLowerCase().trim(), hash, avatar]
    );

    const usuario = result.rows[0];
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES }
    );

    res.status(201).json({
      token,
      usuario: {
        id:        usuario.id,
        nombre:    usuario.nombre,
        email:     usuario.email,
        avatar_url: usuario.avatar_url,
      }
    });
  } catch (err) {
    console.error('Error en POST /api/auth/registro:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;

const express = require('express');
const router  = express.Router();
const pool    = require('../db');

// GET /api/categorias
// Devuelve el árbol completo: categorías con sus subcategorías ordenadas
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT c.id, c.label, c.orden,
        COALESCE(
          json_agg(
            json_build_object('id', s.id, 'label', s.label, 'orden', s.orden)
            ORDER BY s.orden
          ) FILTER (WHERE s.id IS NOT NULL),
          '[]'
        ) AS subs
      FROM categorias c
      LEFT JOIN subcategorias s ON s.categoria_id = c.id
      GROUP BY c.id
      ORDER BY c.orden
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error en GET /api/categorias:', err.message);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

module.exports = router;

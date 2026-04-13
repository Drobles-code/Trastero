const express = require('express');
const router  = express.Router();
const pool    = require('../db');

// ── GET /api/categorias ───────────────────────────────────────
// Devuelve todas las categorías con sus subcategorías incluidas
// Respuesta: [{id, nombre, subs: [{id, nombre}]}]
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        c.id,
        c.nombre,
        COALESCE(
          json_agg(
            json_build_object('id', s.id, 'nombre', s.nombre)
            ORDER BY s.id
          ) FILTER (WHERE s.id IS NOT NULL),
          '[]'
        ) AS subs
      FROM categorias c
      LEFT JOIN subcategorias s ON s.categoria_id = c.id
      GROUP BY c.id, c.nombre
      ORDER BY c.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error en GET /api/categorias:', err);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

module.exports = router;

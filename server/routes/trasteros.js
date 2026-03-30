const express = require('express');
const router  = express.Router();
const pool    = require('../db');

// Transforma la fila de BD al formato que usa Cargaimg.js
// (Nombre, Ruta, Imagen1..4) — igual que inicial.json
function formatearTrastero(row) {
  const imgs = row.imagenes || [];
  const getImg = (pos) => imgs.find(i => i.posicion === pos)?.ruta || '';
  const img1   = getImg(1);
  const sepIdx = img1.lastIndexOf('/');

  return {
    id:      row.id,
    Nombre:  row.nombre,
    Ruta:    sepIdx >= 0 ? img1.substring(0, sepIdx) : '',
    Imagen1: img1.substring(sepIdx + 1),
    Imagen2: getImg(2).split('/').pop(),
    Imagen3: getImg(3).split('/').pop(),
    Imagen4: getImg(4).split('/').pop(),
  };
}

// GET /api/trasteros?q=termino
// Devuelve todos los trasteros. Si se pasa ?q= filtra por nombre.
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;

    const baseQuery = `
      SELECT
        t.id, t.nombre,
        json_agg(
          json_build_object('posicion', i.posicion, 'ruta', i.ruta)
          ORDER BY i.posicion
        ) AS imagenes
      FROM trasteros t
      LEFT JOIN imagenes i ON i.trastero_id = t.id
      ${q && q.trim() ? 'WHERE LOWER(t.nombre) LIKE LOWER($1)' : ''}
      GROUP BY t.id
      ORDER BY t.id
    `;

    const params = q && q.trim() ? [`%${q.trim()}%`] : [];
    const result = await pool.query(baseQuery, params);
    res.json(result.rows.map(formatearTrastero));
  } catch (err) {
    console.error('Error en GET /api/trasteros:', err);
    res.status(500).json({ error: 'Error al obtener trasteros' });
  }
});

// GET /api/trasteros/:nombre
// Devuelve un trastero por nombre (búsqueda exacta, case-insensitive).
router.get('/:nombre', async (req, res) => {
  try {
    const { nombre } = req.params;

    const result = await pool.query(
      `SELECT
        t.id, t.nombre,
        json_agg(
          json_build_object('posicion', i.posicion, 'ruta', i.ruta)
          ORDER BY i.posicion
        ) AS imagenes
      FROM trasteros t
      LEFT JOIN imagenes i ON i.trastero_id = t.id
      WHERE LOWER(t.nombre) = LOWER($1)
      GROUP BY t.id`,
      [nombre]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Trastero no encontrado' });
    }

    res.json(formatearTrastero(result.rows[0]));
  } catch (err) {
    console.error('Error en GET /api/trasteros/:nombre:', err);
    res.status(500).json({ error: 'Error al obtener el trastero' });
  }
});

module.exports = router;

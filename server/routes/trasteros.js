const express        = require('express');
const router         = express.Router();
const path           = require('path');
const fs             = require('fs');
const multer         = require('multer');
const pool           = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

// ── Multer config ─────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../public/uploads', String(req.usuario.id));
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Solo se permiten imágenes'));
  },
});

// ── Helper ────────────────────────────────────────────────────
function formatearTrastero(row) {
  const imgs   = row.imagenes || [];
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

// ── GET /api/trasteros?q=termino&usuario_id=X ─────────────────
router.get('/', async (req, res) => {
  try {
    const { q, usuario_id } = req.query;
    const conditions = [];
    const params     = [];

    if (q && q.trim()) {
      params.push(`%${q.trim()}%`);
      conditions.push(`LOWER(t.nombre) LIKE LOWER($${params.length})`);
    }

    if (usuario_id) {
      params.push(parseInt(usuario_id));
      conditions.push(`t.usuario_id = $${params.length}`);
    }

    const where  = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const result = await pool.query(`
      SELECT
        t.id, t.nombre,
        json_agg(
          json_build_object('posicion', i.posicion, 'ruta', i.ruta)
          ORDER BY i.posicion
        ) AS imagenes
      FROM trasteros t
      LEFT JOIN imagenes i ON i.trastero_id = t.id
      ${where}
      GROUP BY t.id
      ORDER BY t.id
    `, params);

    res.json(result.rows.map(formatearTrastero));
  } catch (err) {
    console.error('Error en GET /api/trasteros:', err);
    res.status(500).json({ error: 'Error al obtener trasteros' });
  }
});

// ── GET /api/trasteros/:nombre ────────────────────────────────
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

// ── POST /api/trasteros ───────────────────────────────────────
router.post('/', authMiddleware, upload.array('imagenes', 4), async (req, res) => {
  const { nombre } = req.body;

  if (!nombre || !nombre.trim()) {
    return res.status(400).json({ error: 'El nombre del artículo es obligatorio' });
  }
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'Sube al menos una imagen' });
  }

  const API_URL = process.env.API_URL || 'http://localhost:5000';

  try {
    const trasteroRes = await pool.query(
      'INSERT INTO trasteros (nombre, usuario_id) VALUES ($1, $2) RETURNING id',
      [nombre.trim(), req.usuario.id]
    );
    const trasteroId = trasteroRes.rows[0].id;

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const ruta = `${API_URL}/uploads/${req.usuario.id}/${file.filename}`;
      await pool.query(
        'INSERT INTO imagenes (trastero_id, posicion, ruta) VALUES ($1, $2, $3)',
        [trasteroId, i + 1, ruta]
      );
    }

    const creado = await pool.query(`
      SELECT t.id, t.nombre,
        json_agg(json_build_object('posicion', i.posicion, 'ruta', i.ruta) ORDER BY i.posicion) AS imagenes
      FROM trasteros t
      LEFT JOIN imagenes i ON i.trastero_id = t.id
      WHERE t.id = $1
      GROUP BY t.id
    `, [trasteroId]);

    res.status(201).json(formatearTrastero(creado.rows[0]));
  } catch (err) {
    console.error('Error en POST /api/trasteros:', err);
    res.status(500).json({ error: 'Error al crear el artículo' });
  }
});

// ── PUT /api/trasteros/:id ────────────────────────────────────
router.put('/:id', authMiddleware, upload.array('imagenes', 4), async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

  const { nombre } = req.body;
  if (!nombre || !nombre.trim()) {
    return res.status(400).json({ error: 'El nombre del artículo es obligatorio' });
  }

  try {
    const trastero = await pool.query(
      'SELECT id, usuario_id FROM trasteros WHERE id = $1',
      [id]
    );
    if (trastero.rows.length === 0) return res.status(404).json({ error: 'Artículo no encontrado' });
    if (trastero.rows[0].usuario_id !== req.usuario.id) {
      return res.status(403).json({ error: 'Sin permiso para editar este artículo' });
    }

    await pool.query('UPDATE trasteros SET nombre = $1 WHERE id = $2', [nombre.trim(), id]);

    if (req.files && req.files.length > 0) {
      const API_URL = process.env.API_URL || 'http://localhost:5000';

      // Borrar imágenes antiguas del disco
      const imgRows = await pool.query('SELECT ruta FROM imagenes WHERE trastero_id = $1', [id]);
      for (const img of imgRows.rows) {
        try {
          const url      = new URL(img.ruta);
          const filePath = path.join(__dirname, '../public', url.pathname);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        } catch {}
      }

      await pool.query('DELETE FROM imagenes WHERE trastero_id = $1', [id]);

      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const ruta = `${API_URL}/uploads/${req.usuario.id}/${file.filename}`;
        await pool.query(
          'INSERT INTO imagenes (trastero_id, posicion, ruta) VALUES ($1, $2, $3)',
          [id, i + 1, ruta]
        );
      }
    }

    const actualizado = await pool.query(`
      SELECT t.id, t.nombre,
        json_agg(json_build_object('posicion', i.posicion, 'ruta', i.ruta) ORDER BY i.posicion) AS imagenes
      FROM trasteros t
      LEFT JOIN imagenes i ON i.trastero_id = t.id
      WHERE t.id = $1
      GROUP BY t.id
    `, [id]);

    res.json(formatearTrastero(actualizado.rows[0]));
  } catch (err) {
    console.error('Error en PUT /api/trasteros/:id:', err);
    res.status(500).json({ error: 'Error al actualizar el artículo' });
  }
});

// ── DELETE /api/trasteros/:id/imagenes/:posicion ──────────────
router.delete('/:id/imagenes/:posicion', authMiddleware, async (req, res) => {
  const id  = parseInt(req.params.id);
  const pos = parseInt(req.params.posicion);
  if (isNaN(id) || isNaN(pos) || pos < 1 || pos > 4) {
    return res.status(400).json({ error: 'Parámetros inválidos' });
  }

  try {
    const trastero = await pool.query(
      'SELECT id, usuario_id FROM trasteros WHERE id = $1', [id]
    );
    if (trastero.rows.length === 0) return res.status(404).json({ error: 'Artículo no encontrado' });
    if (trastero.rows[0].usuario_id !== req.usuario.id) {
      return res.status(403).json({ error: 'Sin permiso' });
    }

    // Borrar fichero del disco
    const imgRow = await pool.query(
      'SELECT ruta FROM imagenes WHERE trastero_id = $1 AND posicion = $2', [id, pos]
    );
    if (imgRow.rows.length === 0) return res.status(404).json({ error: 'Imagen no encontrada' });
    try {
      const url      = new URL(imgRow.rows[0].ruta);
      const filePath = path.join(__dirname, '../public', url.pathname);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch {}

    // Borrar la imagen y re-secuenciar las restantes
    await pool.query('DELETE FROM imagenes WHERE trastero_id = $1 AND posicion = $2', [id, pos]);
    await pool.query(
      'UPDATE imagenes SET posicion = posicion - 1 WHERE trastero_id = $1 AND posicion > $2',
      [id, pos]
    );

    // ¿Quedan imágenes?
    const remaining = await pool.query(
      'SELECT COUNT(*) FROM imagenes WHERE trastero_id = $1', [id]
    );
    if (parseInt(remaining.rows[0].count) === 0) {
      await pool.query('DELETE FROM trasteros WHERE id = $1', [id]);
      return res.json({ deleted: true, id });
    }

    const actualizado = await pool.query(`
      SELECT t.id, t.nombre,
        json_agg(json_build_object('posicion', i.posicion, 'ruta', i.ruta) ORDER BY i.posicion) AS imagenes
      FROM trasteros t
      LEFT JOIN imagenes i ON i.trastero_id = t.id
      WHERE t.id = $1
      GROUP BY t.id
    `, [id]);

    res.json(formatearTrastero(actualizado.rows[0]));
  } catch (err) {
    console.error('Error en DELETE imagen:', err);
    res.status(500).json({ error: 'Error al eliminar la imagen' });
  }
});

// ── DELETE /api/trasteros/:id ─────────────────────────────────
router.delete('/:id', authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

  try {
    const trastero = await pool.query(
      'SELECT id, usuario_id FROM trasteros WHERE id = $1',
      [id]
    );

    if (trastero.rows.length === 0) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }
    if (trastero.rows[0].usuario_id !== req.usuario.id) {
      return res.status(403).json({ error: 'Sin permiso para eliminar este artículo' });
    }

    // Borrar ficheros del disco
    const imagenes = await pool.query('SELECT ruta FROM imagenes WHERE trastero_id = $1', [id]);
    for (const img of imagenes.rows) {
      try {
        const url      = new URL(img.ruta);
        const filePath = path.join(__dirname, '../public', url.pathname);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch {}
    }

    await pool.query('DELETE FROM imagenes  WHERE trastero_id = $1', [id]);
    await pool.query('DELETE FROM trasteros WHERE id = $1',          [id]);

    res.json({ ok: true });
  } catch (err) {
    console.error('Error en DELETE /api/trasteros/:id:', err);
    res.status(500).json({ error: 'Error al eliminar el artículo' });
  }
});

module.exports = router;

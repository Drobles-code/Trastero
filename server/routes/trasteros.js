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

// ── Helpers ───────────────────────────────────────────────────

// Reconstruye el objeto Extras desde columnas tipadas
function buildExtras(row) {
  const extras = {};
  if (row.km           != null) extras.km           = row.km;
  if (row.anio         != null) extras.anio         = row.anio;
  if (row.combustible  != null) extras.combustible  = row.combustible;
  if (row.cv           != null) extras.cv           = row.cv;
  if (row.metros       != null) extras.metros       = row.metros;
  if (row.habitaciones != null) extras.habitaciones = row.habitaciones;
  if (row.banos        != null) extras.banos        = row.banos;
  return extras;
}

function formatearTrastero(row) {
  const imgs   = row.imagenes || [];
  const getImg = (pos) => imgs.find(i => i.posicion === pos)?.ruta || '';
  const img1   = getImg(1);
  const sepIdx = img1.lastIndexOf('/');

  return {
    id:           row.id,
    trastero_id:  row.trastero_id,
    Nombre:       row.nombre,
    Categoria:    row.categoria     || '',
    Subcategoria: row.subcategoria  || '',
    Descripcion:  row.descripcion   || '',
    Precio:       row.precio !== null && row.precio !== undefined ? parseFloat(row.precio) : null,
    Negociable:   row.negociable    || false,
    AceptaCambio: row.acepta_cambio || false,
    Extras:       buildExtras(row),
    Ruta:    sepIdx >= 0 ? img1.substring(0, sepIdx) : '',
    Imagen1: img1.substring(sepIdx + 1),
    Imagen2: getImg(2).split('/').pop(),
    Imagen3: getImg(3).split('/').pop(),
    Imagen4: getImg(4).split('/').pop(),
  };
}

// Extrae valores tipados del body para las columnas de extras
function parseExtras(body) {
  const toInt   = v => (v !== undefined && v !== '') ? parseInt(v,  10) : null;
  const toFloat = v => (v !== undefined && v !== '') ? parseFloat(v)    : null;
  const toStr   = v => (v !== undefined && v !== '') ? String(v)        : null;
  return {
    km:           toInt(body.km),
    anio:         toInt(body.anio),
    combustible:  toStr(body.combustible),
    cv:           toInt(body.cv),
    metros:       toFloat(body.metros),
    habitaciones: toInt(body.habitaciones),
    banos:        toInt(body.banos),
  };
}

// SELECT canónico: une imagenes_detalle → trasteros → imagenes
// Devuelve el mismo shape que formatearTrastero espera
const SELECT_ARTICULO = `
  SELECT
    d.id, d.trastero_id, d.nombre, d.categoria, d.subcategoria, d.descripcion,
    d.precio, d.negociable, d.acepta_cambio,
    d.km, d.anio, d.combustible, d.cv, d.metros, d.habitaciones, d.banos,
    json_agg(
      json_build_object('posicion', i.posicion, 'ruta', i.ruta)
      ORDER BY i.posicion
    ) FILTER (WHERE i.id IS NOT NULL) AS imagenes
  FROM imagenes_detalle d
  JOIN trasteros t ON t.id = d.trastero_id
  LEFT JOIN imagenes i ON i.imagenes_detalle_id = d.id
`;

// ── GET /api/trasteros?q=termino&usuario_id=X ─────────────────
router.get('/', async (req, res) => {
  try {
    const { q, usuario_id } = req.query;
    const conditions = [];
    const params     = [];

    if (q && q.trim()) {
      params.push(`%${q.trim()}%`);
      conditions.push(`(LOWER(d.nombre) LIKE LOWER($${params.length}) OR LOWER(d.descripcion) LIKE LOWER($${params.length}))`);
    }

    if (usuario_id) {
      params.push(parseInt(usuario_id));
      conditions.push(`t.usuario_id = $${params.length}`);
    }

    const where  = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const result = await pool.query(
      `${SELECT_ARTICULO} ${where} GROUP BY d.id ORDER BY d.id`,
      params
    );

    res.json(result.rows.map(formatearTrastero));
  } catch (err) {
    console.error('Error en GET /api/trasteros:', err);
    res.status(500).json({ error: 'Error al obtener trasteros' });
  }
});

// ── GET /api/trasteros/contenedor?usuario_id=X ───────────────
// Devuelve los trasteros-contenedor del usuario (espacios físicos)
router.get('/contenedor', authMiddleware, async (req, res) => {
  try {
    const { usuario_id } = req.query;
    const uid = parseInt(usuario_id) || req.usuario.id;
    // Sólo puede ver sus propios contenedores
    if (uid !== req.usuario.id) return res.status(403).json({ error: 'Sin permiso' });
    const result = await pool.query(
      'SELECT id, nombre, ubicacion FROM trasteros WHERE usuario_id=$1 ORDER BY id',
      [uid]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error en GET /api/trasteros/contenedor:', err);
    res.status(500).json({ error: 'Error al obtener contenedores' });
  }
});

// ── GET /api/trasteros/:nombre ────────────────────────────────
router.get('/:nombre', async (req, res) => {
  try {
    const result = await pool.query(
      `${SELECT_ARTICULO} WHERE LOWER(d.nombre) = LOWER($1) GROUP BY d.id`,
      [req.params.nombre]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }

    res.json(formatearTrastero(result.rows[0]));
  } catch (err) {
    console.error('Error en GET /api/trasteros/:nombre:', err);
    res.status(500).json({ error: 'Error al obtener el artículo' });
  }
});

// ── POST /api/trasteros ───────────────────────────────────────
router.post('/', authMiddleware, (req, res, next) => {
  upload.array('imagenes', 4)(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    next();
  });
}, async (req, res) => {
  const { nombre, trastero_id, categoria, subcategoria, descripcion, precio, negociable, acepta_cambio } = req.body;

  if (!nombre || !nombre.trim()) {
    return res.status(400).json({ error: 'El nombre del artículo es obligatorio' });
  }
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'Sube al menos una imagen' });
  }

  // Obtener el trastero-contenedor del usuario:
  // si viene trastero_id lo validamos, si no buscamos el primero o lo creamos
  let contenedorId = parseInt(trastero_id);
  try {
    if (!contenedorId || isNaN(contenedorId)) {
      // Buscar el primer trastero del usuario
      const found = await pool.query(
        'SELECT id FROM trasteros WHERE usuario_id=$1 ORDER BY id LIMIT 1',
        [req.usuario.id]
      );
      if (found.rows.length > 0) {
        contenedorId = found.rows[0].id;
      } else {
        // Crear uno por defecto
        const created = await pool.query(
          'INSERT INTO trasteros (usuario_id, nombre) VALUES ($1,$2) RETURNING id',
          [req.usuario.id, 'Mi Trastero']
        );
        contenedorId = created.rows[0].id;
      }
    } else {
      // Validar que el trastero_id pertenece al usuario
      const tCheck = await pool.query(
        'SELECT id FROM trasteros WHERE id=$1 AND usuario_id=$2',
        [contenedorId, req.usuario.id]
      );
      if (tCheck.rows.length === 0) {
        return res.status(403).json({ error: 'Trastero no válido o sin permiso' });
      }
    }
  } catch (err) {
    console.error('Error resolviendo trastero:', err);
    return res.status(500).json({ error: 'Error al resolver el trastero' });
  }

  const API_URL   = process.env.API_URL || 'http://localhost:5000';
  const extras    = parseExtras(req.body);
  const precioVal = precio && precio !== '' ? parseFloat(precio) : null;
  const negVal    = negociable    === 'true';
  const cambioVal = acepta_cambio === 'true';

  try {
    const artRes = await pool.query(
      `INSERT INTO imagenes_detalle
         (trastero_id, nombre, categoria, subcategoria, descripcion,
          precio, negociable, acepta_cambio,
          km, anio, combustible, cv, metros, habitaciones, banos)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
       RETURNING id`,
      [contenedorId, nombre.trim(),
       categoria || null, subcategoria || null, descripcion || null,
       precioVal, negVal, cambioVal,
       extras.km, extras.anio, extras.combustible, extras.cv,
       extras.metros, extras.habitaciones, extras.banos]
    );
    const artId = artRes.rows[0].id;

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const ruta = `${API_URL}/uploads/${req.usuario.id}/${file.filename}`;
      await pool.query(
        'INSERT INTO imagenes (imagenes_detalle_id, trastero_id, posicion, ruta) VALUES ($1,$2,$3,$4)',
        [artId, contenedorId, i + 1, ruta]
      );
    }

    const creado = await pool.query(
      `${SELECT_ARTICULO} WHERE d.id = $1 GROUP BY d.id`,
      [artId]
    );

    res.status(201).json(formatearTrastero(creado.rows[0]));
  } catch (err) {
    console.error('Error en POST /api/trasteros:', err);
    res.status(500).json({ error: 'Error al crear el artículo' });
  }
});

// ── PUT /api/trasteros/:id ────────────────────────────────────
router.put('/:id', authMiddleware, (req, res, next) => {
  upload.array('imagenes', 4)(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    next();
  });
}, async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

  const { nombre, categoria, subcategoria, descripcion, precio, negociable, acepta_cambio } = req.body;
  if (!nombre || !nombre.trim()) {
    return res.status(400).json({ error: 'El nombre del artículo es obligatorio' });
  }

  try {
    // Ownership check a través del JOIN
    const artRow = await pool.query(
      `SELECT d.id, d.trastero_id FROM imagenes_detalle d
       JOIN trasteros t ON t.id = d.trastero_id
       WHERE d.id = $1 AND t.usuario_id = $2`,
      [id, req.usuario.id]
    );
    if (artRow.rows.length === 0) {
      return res.status(404).json({ error: 'Artículo no encontrado o sin permiso' });
    }
    const trasteroId = artRow.rows[0].trastero_id;

    const extras    = parseExtras(req.body);
    const precioVal = precio && precio !== '' ? parseFloat(precio) : null;
    const negVal    = negociable    === 'true' || negociable    === true;
    const cambioVal = acepta_cambio === 'true' || acepta_cambio === true;

    await pool.query(
      `UPDATE imagenes_detalle
       SET nombre=$1, categoria=$2, subcategoria=$3, descripcion=$4,
           precio=$5, negociable=$6, acepta_cambio=$7,
           km=$8, anio=$9, combustible=$10, cv=$11,
           metros=$12, habitaciones=$13, banos=$14,
           updated_at=NOW()
       WHERE id=$15`,
      [nombre.trim(), categoria || null, subcategoria || null, descripcion || null,
       precioVal, negVal, cambioVal,
       extras.km, extras.anio, extras.combustible, extras.cv,
       extras.metros, extras.habitaciones, extras.banos,
       id]
    );

    // Procesar slots individualmente
    const API_URL   = process.env.API_URL || 'http://localhost:5000';
    const slotsInfo = JSON.parse(req.body.slots_info || '["existente","existente","existente","existente"]');
    let   fileIdx   = 0;

    for (let i = 0; i < 4; i++) {
      const estado = slotsInfo[i];
      const pos    = i + 1;

      if (estado === 'vacio') {
        const row = await pool.query(
          'SELECT ruta FROM imagenes WHERE imagenes_detalle_id=$1 AND posicion=$2', [id, pos]
        );
        if (row.rows.length > 0) {
          try {
            const url = new URL(row.rows[0].ruta);
            const fp  = path.join(__dirname, '../public', url.pathname);
            if (fs.existsSync(fp)) fs.unlinkSync(fp);
          } catch {}
          await pool.query(
            'DELETE FROM imagenes WHERE imagenes_detalle_id=$1 AND posicion=$2', [id, pos]
          );
        }
      } else if (estado === 'nueva' && req.files[fileIdx]) {
        const file = req.files[fileIdx++];
        const ruta = `${API_URL}/uploads/${req.usuario.id}/${file.filename}`;
        const row  = await pool.query(
          'SELECT ruta FROM imagenes WHERE imagenes_detalle_id=$1 AND posicion=$2', [id, pos]
        );
        if (row.rows.length > 0) {
          try {
            const url = new URL(row.rows[0].ruta);
            const fp  = path.join(__dirname, '../public', url.pathname);
            if (fs.existsSync(fp)) fs.unlinkSync(fp);
          } catch {}
          await pool.query(
            'UPDATE imagenes SET ruta=$1 WHERE imagenes_detalle_id=$2 AND posicion=$3',
            [ruta, id, pos]
          );
        } else {
          await pool.query(
            'INSERT INTO imagenes (imagenes_detalle_id, trastero_id, posicion, ruta) VALUES ($1,$2,$3,$4)',
            [id, trasteroId, pos, ruta]
          );
        }
      }
      // 'existente' → no hacer nada
    }

    const actualizado = await pool.query(
      `${SELECT_ARTICULO} WHERE d.id = $1 GROUP BY d.id`,
      [id]
    );

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
    const artRow = await pool.query(
      `SELECT d.id FROM imagenes_detalle d
       JOIN trasteros t ON t.id = d.trastero_id
       WHERE d.id = $1 AND t.usuario_id = $2`,
      [id, req.usuario.id]
    );
    if (artRow.rows.length === 0) return res.status(404).json({ error: 'Artículo no encontrado o sin permiso' });

    // Borrar fichero del disco
    const imgRow = await pool.query(
      'SELECT ruta FROM imagenes WHERE imagenes_detalle_id=$1 AND posicion=$2', [id, pos]
    );
    if (imgRow.rows.length === 0) return res.status(404).json({ error: 'Imagen no encontrada' });
    try {
      const url      = new URL(imgRow.rows[0].ruta);
      const filePath = path.join(__dirname, '../public', url.pathname);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch {}

    await pool.query(
      'DELETE FROM imagenes WHERE imagenes_detalle_id=$1 AND posicion=$2', [id, pos]
    );
    await pool.query(
      'UPDATE imagenes SET posicion = posicion - 1 WHERE imagenes_detalle_id=$1 AND posicion>$2',
      [id, pos]
    );

    // ¿Quedan imágenes? Si no, borrar el artículo
    const remaining = await pool.query(
      'SELECT COUNT(*) FROM imagenes WHERE imagenes_detalle_id=$1', [id]
    );
    if (parseInt(remaining.rows[0].count) === 0) {
      await pool.query('DELETE FROM imagenes_detalle WHERE id=$1', [id]);
      return res.json({ deleted: true, id });
    }

    const actualizado = await pool.query(
      `${SELECT_ARTICULO} WHERE d.id = $1 GROUP BY d.id`,
      [id]
    );

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
    const artRow = await pool.query(
      `SELECT d.id FROM imagenes_detalle d
       JOIN trasteros t ON t.id = d.trastero_id
       WHERE d.id = $1 AND t.usuario_id = $2`,
      [id, req.usuario.id]
    );
    if (artRow.rows.length === 0) {
      return res.status(404).json({ error: 'Artículo no encontrado o sin permiso' });
    }

    // Borrar ficheros del disco
    const imagenes = await pool.query(
      'SELECT ruta FROM imagenes WHERE imagenes_detalle_id=$1', [id]
    );
    for (const img of imagenes.rows) {
      try {
        const url      = new URL(img.ruta);
        const filePath = path.join(__dirname, '../public', url.pathname);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch {}
    }

    // CASCADE borra imagenes al borrar imagenes_detalle
    await pool.query('DELETE FROM imagenes_detalle WHERE id=$1', [id]);

    res.json({ ok: true });
  } catch (err) {
    console.error('Error en DELETE /api/trasteros/:id:', err);
    res.status(500).json({ error: 'Error al eliminar el artículo' });
  }
});

module.exports = router;

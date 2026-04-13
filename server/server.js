const express = require('express');
const cors    = require('cors');
const path    = require('path');
require('dotenv').config();

const pool = require('./db');

const trasteroRoutes   = require('./routes/trasteros');
const authRoutes       = require('./routes/auth');
const opsRoutes        = require('./routes/ops');
const categoriasRoutes = require('./routes/categorias');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Inicializar tablas de categorías ─────────────────────────
async function initCategorias() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categorias (
        id     SERIAL PRIMARY KEY,
        nombre VARCHAR(100) UNIQUE NOT NULL
      );
      CREATE TABLE IF NOT EXISTS subcategorias (
        id           SERIAL PRIMARY KEY,
        categoria_id INTEGER REFERENCES categorias(id) ON DELETE CASCADE,
        nombre       VARCHAR(100) NOT NULL,
        UNIQUE (categoria_id, nombre)
      );
    `);

    const cats = [
      ['Motor',              ['Coches','Todoterreno','Coches clásicos','Coches sin carnet','Motos','Furgonetas','Camiones','Autobuses','Caravanas','Autocaravanas','Quads','Buggies','Karts','Tuning','Maquinaria','Recambios y accesorios','Otros de motor']],
      ['Inmobiliaria',       ['Pisos','Casas','Locales','Garajes','Terrenos','Oficinas','Trasteros']],
      ['Informática',        ['Portátiles','Ordenadores','Componentes','Periféricos','Impresoras','Tablets']],
      ['Imagen y Sonido',    ['TV','Audio','Cámaras','Proyectores','Reproductores','Accesorios AV']],
      ['Telefonía',          ['Móviles','Tablets','Smartwatches','Accesorios telefonía']],
      ['Juegos',             ['Consolas','Videojuegos','Juegos de mesa','Cartas coleccionables']],
      ['Casa y Jardín',      ['Muebles','Electrodomésticos','Jardín','Iluminación','Decoración','Bricolaje']],
      ['Moda y complementos',['Ropa hombre','Ropa mujer','Ropa niño','Calzado','Bolsos y mochilas','Joyería y relojes']],
      ['Bebés',              ['Ropa bebé','Carricoches','Juguetes bebé','Mobiliario bebé','Alimentación bebé']],
      ['Deportes y náutica', ['Ciclismo','Fitness','Natación','Montaña y escalada','Náutica','Fútbol','Otros deportes']],
      ['Aficiones y ocio',   ['Libros','Música','Coleccionismo','Arte y manualidades','Instrumentos musicales','Fotografía']],
      ['Mascotas y agricultura',['Perros','Gatos','Aves','Peces y reptiles','Maquinaria agrícola','Plantas y semillas']],
      ['Servicios',          ['Reformas y construcción','Limpieza','Clases particulares','Transporte y mudanzas','Otros servicios']],
      ['Formación y libros', ['Libros de texto','Cursos','Idiomas','Informática y tecnología','Otros libros']],
      ['Otros',              ['Sin categoría']],
    ];

    for (const [catNombre, subs] of cats) {
      await pool.query(
        'INSERT INTO categorias (nombre) VALUES ($1) ON CONFLICT (nombre) DO NOTHING',
        [catNombre]
      );
      const { rows } = await pool.query('SELECT id FROM categorias WHERE nombre=$1', [catNombre]);
      const catId = rows[0].id;
      for (const sub of subs) {
        await pool.query(
          'INSERT INTO subcategorias (categoria_id, nombre) VALUES ($1,$2) ON CONFLICT (categoria_id,nombre) DO NOTHING',
          [catId, sub]
        );
      }
    }
    console.log('Tablas de categorías listas.');
  } catch (err) {
    console.error('Error inicializando categorías:', err.message);
  }
}

initCategorias();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use('/api/trasteros',  trasteroRoutes);
app.use('/api/auth',       authRoutes);
app.use('/api/ops',        opsRoutes);
app.use('/api/categorias', categoriasRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler global — devuelve siempre JSON
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err);
  res.status(err.status || 500).json({ error: err.message || 'Error del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor Trastero corriendo en http://localhost:${PORT}`);
});

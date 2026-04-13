-- ============================================================
-- Trastero — Tablas de referencia: categorías y subcategorías
-- Ejecutar: psql -d trastero -f database/categorias_seed.sql
-- ============================================================

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categorias (
  id     SERIAL PRIMARY KEY,
  nombre VARCHAR(100) UNIQUE NOT NULL
);

-- Tabla de subcategorías
CREATE TABLE IF NOT EXISTS subcategorias (
  id           SERIAL PRIMARY KEY,
  categoria_id INTEGER REFERENCES categorias(id) ON DELETE CASCADE,
  nombre       VARCHAR(100) NOT NULL,
  UNIQUE (categoria_id, nombre)
);

-- ── Insertar categorías ──────────────────────────────────────
INSERT INTO categorias (nombre) VALUES
  ('Motor'),
  ('Inmobiliaria'),
  ('Informática'),
  ('Imagen y Sonido'),
  ('Telefonía'),
  ('Juegos'),
  ('Casa y Jardín'),
  ('Moda y complementos'),
  ('Bebés'),
  ('Deportes y náutica'),
  ('Aficiones y ocio'),
  ('Mascotas y agricultura'),
  ('Servicios'),
  ('Formación y libros'),
  ('Otros')
ON CONFLICT (nombre) DO NOTHING;

-- ── Insertar subcategorías ───────────────────────────────────

-- Motor
INSERT INTO subcategorias (categoria_id, nombre)
SELECT c.id, s.nombre FROM categorias c
CROSS JOIN (VALUES
  ('Coches'), ('Todoterreno'), ('Coches clásicos'), ('Coches sin carnet'),
  ('Motos'), ('Furgonetas'), ('Camiones'), ('Autobuses'),
  ('Caravanas'), ('Autocaravanas'), ('Quads'), ('Buggies'),
  ('Karts'), ('Tuning'), ('Maquinaria'),
  ('Recambios y accesorios'), ('Otros de motor')
) AS s(nombre)
WHERE c.nombre = 'Motor'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Inmobiliaria
INSERT INTO subcategorias (categoria_id, nombre)
SELECT c.id, s.nombre FROM categorias c
CROSS JOIN (VALUES
  ('Pisos'), ('Casas'), ('Locales'), ('Garajes'),
  ('Terrenos'), ('Oficinas'), ('Trasteros')
) AS s(nombre)
WHERE c.nombre = 'Inmobiliaria'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Informática
INSERT INTO subcategorias (categoria_id, nombre)
SELECT c.id, s.nombre FROM categorias c
CROSS JOIN (VALUES
  ('Portátiles'), ('Ordenadores'), ('Componentes'),
  ('Periféricos'), ('Impresoras'), ('Tablets')
) AS s(nombre)
WHERE c.nombre = 'Informática'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Imagen y Sonido
INSERT INTO subcategorias (categoria_id, nombre)
SELECT c.id, s.nombre FROM categorias c
CROSS JOIN (VALUES
  ('TV'), ('Audio'), ('Cámaras'),
  ('Proyectores'), ('Reproductores'), ('Accesorios AV')
) AS s(nombre)
WHERE c.nombre = 'Imagen y Sonido'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Telefonía
INSERT INTO subcategorias (categoria_id, nombre)
SELECT c.id, s.nombre FROM categorias c
CROSS JOIN (VALUES
  ('Móviles'), ('Tablets'), ('Smartwatches'), ('Accesorios telefonía')
) AS s(nombre)
WHERE c.nombre = 'Telefonía'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Juegos
INSERT INTO subcategorias (categoria_id, nombre)
SELECT c.id, s.nombre FROM categorias c
CROSS JOIN (VALUES
  ('Consolas'), ('Videojuegos'), ('Juegos de mesa'), ('Cartas coleccionables')
) AS s(nombre)
WHERE c.nombre = 'Juegos'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Casa y Jardín
INSERT INTO subcategorias (categoria_id, nombre)
SELECT c.id, s.nombre FROM categorias c
CROSS JOIN (VALUES
  ('Muebles'), ('Electrodomésticos'), ('Jardín'),
  ('Iluminación'), ('Decoración'), ('Bricolaje')
) AS s(nombre)
WHERE c.nombre = 'Casa y Jardín'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Moda y complementos
INSERT INTO subcategorias (categoria_id, nombre)
SELECT c.id, s.nombre FROM categorias c
CROSS JOIN (VALUES
  ('Ropa hombre'), ('Ropa mujer'), ('Ropa niño'),
  ('Calzado'), ('Bolsos y mochilas'), ('Joyería y relojes')
) AS s(nombre)
WHERE c.nombre = 'Moda y complementos'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Bebés
INSERT INTO subcategorias (categoria_id, nombre)
SELECT c.id, s.nombre FROM categorias c
CROSS JOIN (VALUES
  ('Ropa bebé'), ('Carricoches'), ('Juguetes bebé'),
  ('Mobiliario bebé'), ('Alimentación bebé')
) AS s(nombre)
WHERE c.nombre = 'Bebés'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Deportes y náutica
INSERT INTO subcategorias (categoria_id, nombre)
SELECT c.id, s.nombre FROM categorias c
CROSS JOIN (VALUES
  ('Ciclismo'), ('Fitness'), ('Natación'),
  ('Montaña y escalada'), ('Náutica'), ('Fútbol'), ('Otros deportes')
) AS s(nombre)
WHERE c.nombre = 'Deportes y náutica'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Aficiones y ocio
INSERT INTO subcategorias (categoria_id, nombre)
SELECT c.id, s.nombre FROM categorias c
CROSS JOIN (VALUES
  ('Libros'), ('Música'), ('Coleccionismo'),
  ('Arte y manualidades'), ('Instrumentos musicales'), ('Fotografía')
) AS s(nombre)
WHERE c.nombre = 'Aficiones y ocio'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Mascotas y agricultura
INSERT INTO subcategorias (categoria_id, nombre)
SELECT c.id, s.nombre FROM categorias c
CROSS JOIN (VALUES
  ('Perros'), ('Gatos'), ('Aves'),
  ('Peces y reptiles'), ('Maquinaria agrícola'), ('Plantas y semillas')
) AS s(nombre)
WHERE c.nombre = 'Mascotas y agricultura'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Servicios
INSERT INTO subcategorias (categoria_id, nombre)
SELECT c.id, s.nombre FROM categorias c
CROSS JOIN (VALUES
  ('Reformas y construcción'), ('Limpieza'), ('Clases particulares'),
  ('Transporte y mudanzas'), ('Otros servicios')
) AS s(nombre)
WHERE c.nombre = 'Servicios'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Formación y libros
INSERT INTO subcategorias (categoria_id, nombre)
SELECT c.id, s.nombre FROM categorias c
CROSS JOIN (VALUES
  ('Libros de texto'), ('Cursos'), ('Idiomas'),
  ('Informática y tecnología'), ('Otros libros')
) AS s(nombre)
WHERE c.nombre = 'Formación y libros'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Otros
INSERT INTO subcategorias (categoria_id, nombre)
SELECT c.id, s.nombre FROM categorias c
CROSS JOIN (VALUES
  ('Sin categoría')
) AS s(nombre)
WHERE c.nombre = 'Otros'
ON CONFLICT (categoria_id, nombre) DO NOTHING;

-- Verificación
SELECT c.nombre AS categoria, COUNT(s.id) AS subcategorias
FROM categorias c
LEFT JOIN subcategorias s ON s.categoria_id = c.id
GROUP BY c.id, c.nombre
ORDER BY c.id;

-- ============================================================
-- Trastero — Migración: tablas categorias + subcategorias
-- Ejecutar en pgAdmin: copiar y pegar en Query Tool → F5
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. Recrear tablas con columna 'label' y 'orden'
-- ─────────────────────────────────────────────────────────────
DROP TABLE IF EXISTS subcategorias CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;

CREATE TABLE categorias (
  id     SERIAL PRIMARY KEY,
  label  VARCHAR(100) UNIQUE NOT NULL,
  orden  INTEGER DEFAULT 0
);

CREATE TABLE subcategorias (
  id           SERIAL PRIMARY KEY,
  label        VARCHAR(100) NOT NULL,
  categoria_id INTEGER NOT NULL REFERENCES categorias(id) ON DELETE CASCADE,
  orden        INTEGER DEFAULT 0,
  UNIQUE (categoria_id, label)
);

CREATE INDEX IF NOT EXISTS idx_subcategorias_cat ON subcategorias (categoria_id);

-- ─────────────────────────────────────────────────────────────
-- 2. Insertar categorías
-- ─────────────────────────────────────────────────────────────
INSERT INTO categorias (label, orden) VALUES
  ('Motor',                1),
  ('Inmobiliaria',         2),
  ('Informática',          3),
  ('Imagen y Sonido',      4),
  ('Telefonía',            5),
  ('Juegos',               6),
  ('Casa y Jardín',        7),
  ('Moda y complementos',  8),
  ('Bebés',                9),
  ('Deportes y náutica',  10),
  ('Aficiones y ocio',    11),
  ('Mascotas y agricultura', 12),
  ('Servicios',           13),
  ('Formación y libros',  14),
  ('Otros',               15);

-- ─────────────────────────────────────────────────────────────
-- 3. Insertar subcategorías
-- ─────────────────────────────────────────────────────────────

-- Motor
INSERT INTO subcategorias (label, categoria_id, orden) SELECT s.label, c.id, s.orden FROM categorias c, (VALUES
  ('Coches',                  1),
  ('Todoterreno',             2),
  ('Coches clásicos',         3),
  ('Coches sin carnet',       4),
  ('Motos',                   5),
  ('Furgonetas',              6),
  ('Camiones',                7),
  ('Autobuses',               8),
  ('Caravanas',               9),
  ('Autocaravanas',          10),
  ('Quads',                  11),
  ('Buggies',                12),
  ('Karts',                  13),
  ('Tuning',                 14),
  ('Maquinaria',             15),
  ('Recambios y accesorios', 16),
  ('Otros de motor',         17)
) AS s(label, orden) WHERE c.label = 'Motor';

-- Inmobiliaria
INSERT INTO subcategorias (label, categoria_id, orden) SELECT s.label, c.id, s.orden FROM categorias c, (VALUES
  ('Pisos',      1),
  ('Casas',      2),
  ('Locales',    3),
  ('Garajes',    4),
  ('Terrenos',   5),
  ('Oficinas',   6),
  ('Trasteros',  7)
) AS s(label, orden) WHERE c.label = 'Inmobiliaria';

-- Informática
INSERT INTO subcategorias (label, categoria_id, orden) SELECT s.label, c.id, s.orden FROM categorias c, (VALUES
  ('Portátiles',   1),
  ('Ordenadores',  2),
  ('Componentes',  3),
  ('Periféricos',  4),
  ('Impresoras',   5),
  ('Tablets',      6)
) AS s(label, orden) WHERE c.label = 'Informática';

-- Imagen y Sonido
INSERT INTO subcategorias (label, categoria_id, orden) SELECT s.label, c.id, s.orden FROM categorias c, (VALUES
  ('TV',              1),
  ('Audio',           2),
  ('Cámaras',         3),
  ('Proyectores',     4),
  ('Reproductores',   5),
  ('Accesorios AV',   6)
) AS s(label, orden) WHERE c.label = 'Imagen y Sonido';

-- Telefonía
INSERT INTO subcategorias (label, categoria_id, orden) SELECT s.label, c.id, s.orden FROM categorias c, (VALUES
  ('Móviles',               1),
  ('Tablets',               2),
  ('Smartwatches',          3),
  ('Accesorios telefonía',  4)
) AS s(label, orden) WHERE c.label = 'Telefonía';

-- Juegos
INSERT INTO subcategorias (label, categoria_id, orden) SELECT s.label, c.id, s.orden FROM categorias c, (VALUES
  ('Consolas',               1),
  ('Videojuegos',            2),
  ('Juegos de mesa',         3),
  ('Cartas coleccionables',  4)
) AS s(label, orden) WHERE c.label = 'Juegos';

-- Casa y Jardín
INSERT INTO subcategorias (label, categoria_id, orden) SELECT s.label, c.id, s.orden FROM categorias c, (VALUES
  ('Muebles',           1),
  ('Electrodomésticos', 2),
  ('Jardín',            3),
  ('Iluminación',       4),
  ('Decoración',        5),
  ('Bricolaje',         6)
) AS s(label, orden) WHERE c.label = 'Casa y Jardín';

-- Moda y complementos
INSERT INTO subcategorias (label, categoria_id, orden) SELECT s.label, c.id, s.orden FROM categorias c, (VALUES
  ('Ropa hombre',        1),
  ('Ropa mujer',         2),
  ('Ropa niño',          3),
  ('Calzado',            4),
  ('Bolsos y mochilas',  5),
  ('Joyería y relojes',  6)
) AS s(label, orden) WHERE c.label = 'Moda y complementos';

-- Bebés
INSERT INTO subcategorias (label, categoria_id, orden) SELECT s.label, c.id, s.orden FROM categorias c, (VALUES
  ('Ropa bebé',          1),
  ('Carricoches',        2),
  ('Juguetes bebé',      3),
  ('Mobiliario bebé',    4),
  ('Alimentación bebé',  5)
) AS s(label, orden) WHERE c.label = 'Bebés';

-- Deportes y náutica
INSERT INTO subcategorias (label, categoria_id, orden) SELECT s.label, c.id, s.orden FROM categorias c, (VALUES
  ('Ciclismo',              1),
  ('Fitness',               2),
  ('Natación',              3),
  ('Montaña y escalada',    4),
  ('Náutica',               5),
  ('Fútbol',                6),
  ('Otros deportes',        7)
) AS s(label, orden) WHERE c.label = 'Deportes y náutica';

-- Aficiones y ocio
INSERT INTO subcategorias (label, categoria_id, orden) SELECT s.label, c.id, s.orden FROM categorias c, (VALUES
  ('Libros',                   1),
  ('Música',                   2),
  ('Coleccionismo',             3),
  ('Arte y manualidades',       4),
  ('Instrumentos musicales',    5),
  ('Fotografía',                6)
) AS s(label, orden) WHERE c.label = 'Aficiones y ocio';

-- Mascotas y agricultura
INSERT INTO subcategorias (label, categoria_id, orden) SELECT s.label, c.id, s.orden FROM categorias c, (VALUES
  ('Perros',                1),
  ('Gatos',                 2),
  ('Aves',                  3),
  ('Peces y reptiles',      4),
  ('Maquinaria agrícola',   5),
  ('Plantas y semillas',    6)
) AS s(label, orden) WHERE c.label = 'Mascotas y agricultura';

-- Servicios
INSERT INTO subcategorias (label, categoria_id, orden) SELECT s.label, c.id, s.orden FROM categorias c, (VALUES
  ('Reformas y construcción',    1),
  ('Limpieza',                   2),
  ('Clases particulares',        3),
  ('Transporte y mudanzas',      4),
  ('Otros servicios',            5)
) AS s(label, orden) WHERE c.label = 'Servicios';

-- Formación y libros
INSERT INTO subcategorias (label, categoria_id, orden) SELECT s.label, c.id, s.orden FROM categorias c, (VALUES
  ('Libros de texto',            1),
  ('Cursos',                     2),
  ('Idiomas',                    3),
  ('Informática y tecnología',   4),
  ('Otros libros',               5)
) AS s(label, orden) WHERE c.label = 'Formación y libros';

-- Otros
INSERT INTO subcategorias (label, categoria_id, orden) SELECT s.label, c.id, s.orden FROM categorias c, (VALUES
  ('Sin categoría', 1)
) AS s(label, orden) WHERE c.label = 'Otros';

-- ─────────────────────────────────────────────────────────────
-- 4. Añadir subcategoria_id a imagenes_detalle
-- ─────────────────────────────────────────────────────────────
ALTER TABLE imagenes_detalle
  ADD COLUMN IF NOT EXISTS subcategoria_id INTEGER REFERENCES subcategorias(id);

CREATE INDEX IF NOT EXISTS idx_imgdetalle_subcat ON imagenes_detalle (subcategoria_id);

-- ─────────────────────────────────────────────────────────────
-- 5. Migrar datos existentes (texto → id)
-- ─────────────────────────────────────────────────────────────
UPDATE imagenes_detalle d
SET subcategoria_id = s.id
FROM subcategorias s
WHERE d.subcategoria = s.label
  AND d.subcategoria_id IS NULL;

-- ─────────────────────────────────────────────────────────────
-- 6. Verificación — ejecutar para comprobar
-- ─────────────────────────────────────────────────────────────
-- SELECT COUNT(*) FROM categorias;       -- debe ser 15
-- SELECT COUNT(*) FROM subcategorias;    -- debe ser 91
-- SELECT COUNT(*) FROM imagenes_detalle WHERE subcategoria IS NOT NULL AND subcategoria_id IS NULL;
-- (debe ser 0 si todos los textos coinciden con los labels)

-- ─────────────────────────────────────────────────────────────
-- 7. Eliminar columnas texto (ejecutar SOLO tras verificar paso 6)
-- ─────────────────────────────────────────────────────────────
-- ALTER TABLE imagenes_detalle DROP COLUMN categoria;
-- ALTER TABLE imagenes_detalle DROP COLUMN subcategoria;

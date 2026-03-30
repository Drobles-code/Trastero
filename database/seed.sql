-- ============================================================
-- Trastero — Datos iniciales (seed)
-- Ejecutar DESPUÉS de schema.sql:
--   psql -d trastero -f database/seed.sql
-- ============================================================

-- Usuario administrador de ejemplo
-- Contraseña: admin123  (hash bcrypt generado con saltRounds=10)
INSERT INTO usuarios (nombre, email, password, avatar_url) VALUES
  ('Admin', 'admin@trastero.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin')
ON CONFLICT (email) DO NOTHING;

-- ============================================================
-- Trasteros (23 registros de inicial.json)
-- Ruta base de imágenes: img-gif/Gif-101TNF18/
-- ============================================================

INSERT INTO trasteros (nombre, usuario_id) VALUES
  ('flor',          1),
  ('lapto',         1),
  ('cafe',          1),
  ('car',           1),
  ('casa',          1),
  ('arbol',         1),
  ('Tu trastero07', 1),
  ('Tu trastero08', 1),
  ('Tu trastero09', 1),
  ('Tu trastero10', 1),
  ('Tu trastero11', 1),
  ('Tu trastero12', 1),
  ('Tu trastero13', 1),
  ('Tu trastero14', 1),
  ('Tu trastero15', 1),
  ('Tu trastero16', 1),
  ('Tu trastero17', 1),
  ('Tu trastero18', 1),
  ('Tu trastero19', 1),
  ('Tu trastero20', 1),
  ('Tu trastero21', 1),
  ('Tu trastero22', 1),
  ('Tu trastero23', 1);

-- ============================================================
-- Imágenes (4 por trastero)
-- Ruta completa: img-gif/Gif-101TNF18/{archivo}
-- ============================================================

-- flor (id=1)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (1, 'img-gif/Gif-101TNF18/29194001.jpg', 1),
  (1, 'img-gif/Gif-101TNF18/29194002.jpg', 2),
  (1, 'img-gif/Gif-101TNF18/29194004.jpg', 3),
  (1, 'img-gif/Gif-101TNF18/29194005.jpg', 4);

-- lapto (id=2)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (2, 'img-gif/Gif-101TNF18/29194006.jpg', 1),
  (2, 'img-gif/Gif-101TNF18/29194007.jpg', 2),
  (2, 'img-gif/Gif-101TNF18/29194008.jpg', 3),
  (2, 'img-gif/Gif-101TNF18/29194009.jpg', 4);

-- cafe (id=3)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (3, 'img-gif/Gif-101TNF18/2919400e.jpg', 1),
  (3, 'img-gif/Gif-101TNF18/29194010.jpg', 2),
  (3, 'img-gif/Gif-101TNF18/29194011.jpg', 3),
  (3, 'img-gif/Gif-101TNF18/29194012.jpg', 4);

-- car (id=4)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (4, 'img-gif/Gif-101TNF18/29194013.jpg', 1),
  (4, 'img-gif/Gif-101TNF18/29194014.jpg', 2),
  (4, 'img-gif/Gif-101TNF18/29194015.jpg', 3),
  (4, 'img-gif/Gif-101TNF18/29194016.jpg', 4);

-- casa (id=5)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (5, 'img-gif/Gif-101TNF18/29194017.jpg', 1),
  (5, 'img-gif/Gif-101TNF18/29194018.jpg', 2),
  (5, 'img-gif/Gif-101TNF18/29194019.jpg', 3),
  (5, 'img-gif/Gif-101TNF18/2919401a.jpg', 4);

-- arbol (id=6)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (6, 'img-gif/Gif-101TNF18/2919401c.jpg', 1),
  (6, 'img-gif/Gif-101TNF18/2919401d.jpg', 2),
  (6, 'img-gif/Gif-101TNF18/29194020.jpg', 3),
  (6, 'img-gif/Gif-101TNF18/29194021.jpg', 4);

-- Tu trastero07 (id=7)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (7, 'img-gif/Gif-101TNF18/29194022.jpg', 1),
  (7, 'img-gif/Gif-101TNF18/29194023.jpg', 2),
  (7, 'img-gif/Gif-101TNF18/29194024.jpg', 3),
  (7, 'img-gif/Gif-101TNF18/29194025.jpg', 4);

-- Tu trastero08 (id=8)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (8, 'img-gif/Gif-101TNF18/29194029.jpg', 1),
  (8, 'img-gif/Gif-101TNF18/2919402a.jpg', 2),
  (8, 'img-gif/Gif-101TNF18/2919402d.jpg', 3),
  (8, 'img-gif/Gif-101TNF18/2919402e.jpg', 4);

-- Tu trastero09 (id=9)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (9, 'img-gif/Gif-101TNF18/2919402f.jpg', 1),
  (9, 'img-gif/Gif-101TNF18/29194030.jpg', 2),
  (9, 'img-gif/Gif-101TNF18/29194031.jpg', 3),
  (9, 'img-gif/Gif-101TNF18/29194032.jpg', 4);

-- Tu trastero10 (id=10)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (10, 'img-gif/Gif-101TNF18/29194033.jpg', 1),
  (10, 'img-gif/Gif-101TNF18/29194034.jpg', 2),
  (10, 'img-gif/Gif-101TNF18/29194035.jpg', 3),
  (10, 'img-gif/Gif-101TNF18/29194036.jpg', 4);

-- Tu trastero11 (id=11)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (11, 'img-gif/Gif-101TNF18/29194037.jpg', 1),
  (11, 'img-gif/Gif-101TNF18/29194038.jpg', 2),
  (11, 'img-gif/Gif-101TNF18/29194039.jpg', 3),
  (11, 'img-gif/Gif-101TNF18/2919403a.jpg', 4);

-- Tu trastero12 (id=12)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (12, 'img-gif/Gif-101TNF18/2919403b.jpg', 1),
  (12, 'img-gif/Gif-101TNF18/2919403c.jpg', 2),
  (12, 'img-gif/Gif-101TNF18/2919403d.jpg', 3),
  (12, 'img-gif/Gif-101TNF18/2919403e.jpg', 4);

-- Tu trastero13 (id=13)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (13, 'img-gif/Gif-101TNF18/2919403f.jpg', 1),
  (13, 'img-gif/Gif-101TNF18/29194040.jpg', 2),
  (13, 'img-gif/Gif-101TNF18/29194041.jpg', 3),
  (13, 'img-gif/Gif-101TNF18/29194042.jpg', 4);

-- Tu trastero14 (id=14)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (14, 'img-gif/Gif-101TNF18/29194043.jpg', 1),
  (14, 'img-gif/Gif-101TNF18/29194044.jpg', 2),
  (14, 'img-gif/Gif-101TNF18/29194045.jpg', 3),
  (14, 'img-gif/Gif-101TNF18/29194046.jpg', 4);

-- Tu trastero15 (id=15)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (15, 'img-gif/Gif-101TNF18/29194047.jpg', 1),
  (15, 'img-gif/Gif-101TNF18/29194048.jpg', 2),
  (15, 'img-gif/Gif-101TNF18/29194049.jpg', 3),
  (15, 'img-gif/Gif-101TNF18/2919404a.jpg', 4);

-- Tu trastero16 (id=16)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (16, 'img-gif/Gif-101TNF18/2919404b.jpg', 1),
  (16, 'img-gif/Gif-101TNF18/2919404c.jpg', 2),
  (16, 'img-gif/Gif-101TNF18/2919404d.jpg', 3),
  (16, 'img-gif/Gif-101TNF18/2919404e.jpg', 4);

-- Tu trastero17 (id=17)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (17, 'img-gif/Gif-101TNF18/2919404f.jpg', 1),
  (17, 'img-gif/Gif-101TNF18/29194050.jpg', 2),
  (17, 'img-gif/Gif-101TNF18/29194051.jpg', 3),
  (17, 'img-gif/Gif-101TNF18/29194052.jpg', 4);

-- Tu trastero18 (id=18)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (18, 'img-gif/Gif-101TNF18/29194053.jpg', 1),
  (18, 'img-gif/Gif-101TNF18/29194054.jpg', 2),
  (18, 'img-gif/Gif-101TNF18/29194055.jpg', 3),
  (18, 'img-gif/Gif-101TNF18/29194056.jpg', 4);

-- Tu trastero19 (id=19)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (19, 'img-gif/Gif-101TNF18/29194057.jpg', 1),
  (19, 'img-gif/Gif-101TNF18/29194058.jpg', 2),
  (19, 'img-gif/Gif-101TNF18/29194059.jpg', 3),
  (19, 'img-gif/Gif-101TNF18/2919405a.jpg', 4);

-- Tu trastero20 (id=20)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (20, 'img-gif/Gif-101TNF18/2919405b.jpg', 1),
  (20, 'img-gif/Gif-101TNF18/2919405c.jpg', 2),
  (20, 'img-gif/Gif-101TNF18/2919405d.jpg', 3),
  (20, 'img-gif/Gif-101TNF18/2919405e.jpg', 4);

-- Tu trastero21 (id=21)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (21, 'img-gif/Gif-101TNF18/2919405f.jpg', 1),
  (21, 'img-gif/Gif-101TNF18/29194060.jpg', 2),
  (21, 'img-gif/Gif-101TNF18/29194061.jpg', 3),
  (21, 'img-gif/Gif-101TNF18/29194062.jpg', 4);

-- Tu trastero22 (id=22)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (22, 'img-gif/Gif-101TNF18/29194063.jpg', 1),
  (22, 'img-gif/Gif-101TNF18/29194064.jpg', 2),
  (22, 'img-gif/Gif-101TNF18/29194065.jpg', 3),
  (22, 'img-gif/Gif-101TNF18/29194066.jpg', 4);

-- Tu trastero23 (id=23)
INSERT INTO imagenes (trastero_id, ruta, posicion) VALUES
  (23, 'img-gif/Gif-101TNF18/29194067.jpg', 1),
  (23, 'img-gif/Gif-101TNF18/29194068.jpg', 2),
  (23, 'img-gif/Gif-101TNF18/29194069.jpg', 3),
  (23, 'img-gif/Gif-101TNF18/2919406a.jpg', 4);

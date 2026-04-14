-- ============================================================
-- Trastero — Esquema PostgreSQL v2
-- Ejecutar: psql -d trastero -f database/schema.sql
-- ============================================================

-- Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id          SERIAL PRIMARY KEY,
  nombre      VARCHAR(255) NOT NULL,
  email       VARCHAR(255) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,
  avatar_url  VARCHAR(500),
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);

-- Trasteros — espacios físicos (garaje, tienda, local...)
-- Un usuario puede tener varios trasteros
CREATE TABLE IF NOT EXISTS trasteros (
  id          SERIAL PRIMARY KEY,
  usuario_id  INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
  nombre      VARCHAR(255) NOT NULL,
  ubicacion   VARCHAR(500),
  created_at  TIMESTAMP DEFAULT NOW()
);

-- Categorías de artículos
CREATE TABLE IF NOT EXISTS categorias (
  id     SERIAL PRIMARY KEY,
  label  VARCHAR(100) UNIQUE NOT NULL,
  orden  INTEGER DEFAULT 0
);

-- Subcategorías — relacionadas con su categoría padre
CREATE TABLE IF NOT EXISTS subcategorias (
  id           SERIAL PRIMARY KEY,
  label        VARCHAR(100) NOT NULL,
  categoria_id INTEGER NOT NULL REFERENCES categorias(id) ON DELETE CASCADE,
  orden        INTEGER DEFAULT 0,
  UNIQUE (categoria_id, label)
);

-- Imagenes_detalle — artículos dentro de un trastero
-- Cada artículo pertenece a un trastero
CREATE TABLE IF NOT EXISTS imagenes_detalle (
  id               SERIAL PRIMARY KEY,
  trastero_id      INTEGER REFERENCES trasteros(id) ON DELETE CASCADE,
  nombre           VARCHAR(255) NOT NULL,
  descripcion      TEXT,
  precio           DECIMAL(10,2),
  negociable       BOOLEAN DEFAULT FALSE,
  acepta_cambio    BOOLEAN DEFAULT FALSE,
  subcategoria_id  INTEGER REFERENCES subcategorias(id),
  -- extras como columnas tipadas
  km            INTEGER,
  anio          INTEGER,
  combustible   VARCHAR(50),
  cv            INTEGER,
  metros        DECIMAL(8,2),
  habitaciones  INTEGER,
  banos         INTEGER,
  created_at    TIMESTAMP DEFAULT NOW(),
  updated_at    TIMESTAMP DEFAULT NOW()
);

-- Imagenes — fotos de un artículo
-- FK doble: imagenes_detalle_id (principal) + trastero_id (directo, redundante)
CREATE TABLE IF NOT EXISTS imagenes (
  id                  SERIAL PRIMARY KEY,
  imagenes_detalle_id INTEGER REFERENCES imagenes_detalle(id) ON DELETE CASCADE,
  trastero_id         INTEGER REFERENCES trasteros(id) ON DELETE CASCADE,
  ruta                VARCHAR(500) NOT NULL,
  ruta_thumb          VARCHAR(500),          -- thumbnail WebP generado automáticamente por sharp
  posicion            INTEGER CHECK (posicion BETWEEN 1 AND 4),
  created_at          TIMESTAMP DEFAULT NOW()
);

-- Preferencias de tema por usuario
CREATE TABLE IF NOT EXISTS preferencias_usuario (
  id           SERIAL PRIMARY KEY,
  usuario_id   INTEGER UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE,
  bg_color     VARCHAR(7) DEFAULT '#000000',
  text_color   VARCHAR(7) DEFAULT '#ffffff',
  accent_color VARCHAR(7) DEFAULT '#667eea',
  modal_color  VARCHAR(7) DEFAULT '#1a1a1a',
  card_title   VARCHAR(7) DEFAULT '#1a1a2e',
  navbar_color VARCHAR(7) DEFAULT '#000000',
  updated_at   TIMESTAMP DEFAULT NOW()
);

-- Operadores del sistema (mantenimiento — acceso separado de usuarios)
CREATE TABLE IF NOT EXISTS sys_operators (
  id         SERIAL PRIMARY KEY,
  nombre     VARCHAR(255) NOT NULL,
  email      VARCHAR(255) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,
  activo     BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_subcategorias_cat        ON subcategorias    (categoria_id);
CREATE INDEX IF NOT EXISTS idx_trasteros_usuario        ON trasteros        (usuario_id);
CREATE INDEX IF NOT EXISTS idx_imgdetalle_trastero    ON imagenes_detalle (trastero_id);
CREATE INDEX IF NOT EXISTS idx_imgdetalle_nombre      ON imagenes_detalle (LOWER(nombre));
CREATE INDEX IF NOT EXISTS idx_imgdetalle_subcat      ON imagenes_detalle (subcategoria_id);
CREATE INDEX IF NOT EXISTS idx_imagenes_detalle_id    ON imagenes         (imagenes_detalle_id);
CREATE INDEX IF NOT EXISTS idx_imagenes_trastero      ON imagenes         (trastero_id);

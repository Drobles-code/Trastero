-- ============================================================
-- Trastero — Esquema PostgreSQL
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

-- Trasteros (unidades de almacenamiento)
CREATE TABLE IF NOT EXISTS trasteros (
  id            SERIAL PRIMARY KEY,
  nombre        VARCHAR(255) NOT NULL,
  usuario_id    INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
  descripcion   TEXT,
  precio        DECIMAL(10,2),
  acepta_cambio BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMP DEFAULT NOW(),
  updated_at    TIMESTAMP DEFAULT NOW()
);

-- Imágenes (4 por trastero, grid 2x2)
CREATE TABLE IF NOT EXISTS imagenes (
  id          SERIAL PRIMARY KEY,
  trastero_id INTEGER REFERENCES trasteros(id) ON DELETE CASCADE,
  ruta        VARCHAR(500) NOT NULL,
  posicion    INTEGER CHECK (posicion BETWEEN 1 AND 4),
  created_at  TIMESTAMP DEFAULT NOW()
);

-- Categorías
CREATE TABLE IF NOT EXISTS categorias (
  id          SERIAL PRIMARY KEY,
  nombre      VARCHAR(100) UNIQUE NOT NULL,
  descripcion TEXT
);

-- Relación trastero ↔ categoría (muchos a muchos)
CREATE TABLE IF NOT EXISTS trastero_categorias (
  trastero_id  INTEGER REFERENCES trasteros(id) ON DELETE CASCADE,
  categoria_id INTEGER REFERENCES categorias(id) ON DELETE CASCADE,
  PRIMARY KEY (trastero_id, categoria_id)
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

-- Índices para búsqueda rápida
CREATE INDEX IF NOT EXISTS idx_trasteros_nombre ON trasteros (LOWER(nombre));
CREATE INDEX IF NOT EXISTS idx_trasteros_usuario ON trasteros (usuario_id);
CREATE INDEX IF NOT EXISTS idx_imagenes_trastero ON imagenes (trastero_id);

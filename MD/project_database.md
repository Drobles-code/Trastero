---
name: project_database
description: BD esquema v2 — tablas, relaciones, campos, migraciones. Cargar al tocar schema.sql, seed.sql, tablas o migraciones.
type: project
---

# Base de datos — esquema v2

## Relaciones
```
usuarios
  └─ trasteros        (espacios físicos: garaje, tienda, local...)
       └─ imagenes_detalle  (artículos: lo que se vende)
            └─ imagenes     (fotos del artículo, posicion 1-4)
```

## Tablas

### usuarios
`id, nombre, email, password, avatar_url, created_at, updated_at`

### trasteros
`id, usuario_id → usuarios, nombre, ubicacion, created_at`
- Un usuario puede tener varios trasteros
- Al registrar usuario → se auto-crea "Mi Trastero" (auth.js)

### imagenes_detalle (artículos)
`id, trastero_id → trasteros, nombre, descripcion, precio, negociable, acepta_cambio, categoria, subcategoria, created_at, updated_at`
Campos extra tipados (antes JSONB):
- Motor: `km INTEGER, anio INTEGER, combustible VARCHAR, cv INTEGER`
- Inmobiliaria: `metros DECIMAL, habitaciones INTEGER, banos INTEGER`

### imagenes
`id, imagenes_detalle_id → imagenes_detalle (CASCADE), trastero_id → trasteros (FK redundante, confirmado), ruta, posicion CHECK(1-4), created_at`

### preferencias_usuario
`id, usuario_id UNIQUE, bg_color, text_color, accent_color, modal_color, card_title, navbar_color, updated_at`

## Aplicar migraciones (pgAdmin Query Tool)
> IMPORTANTE: pegar el SQL directamente — NO escribir la ruta del archivo (da error de sintaxis)

**Paso 1** — borrar tablas viejas:
```sql
DROP TABLE IF EXISTS imagenes CASCADE;
DROP TABLE IF EXISTS trastero_categorias CASCADE;
DROP TABLE IF EXISTS imagenes_detalle CASCADE;
DROP TABLE IF EXISTS trasteros CASCADE;
```

**Paso 2** — abrir `database/schema.sql` en VS Code → Ctrl+A → Ctrl+C → pegar en pgAdmin → F5

**Paso 3** — abrir `database/seed.sql` en VS Code → Ctrl+A → Ctrl+C → pegar en pgAdmin → F5

## Seed
- 1 usuario de prueba (id=1)
- 1 trastero contenedor (id=1)
- 23 artículos en imagenes_detalle
- Imágenes con ambos FK (imagenes_detalle_id + trastero_id)

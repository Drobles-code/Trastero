---
name: project_backend
description: Backend Express — rutas, endpoints API, auth, helpers. Cargar al tocar server/, routes/, middleware/ o API.
type: project
---

# Backend — Express + PostgreSQL

## Archivos clave
- `server/server.js` — Express + cors + error handler JSON global
- `server/routes/trasteros.js` — CRUD artículos
- `server/routes/auth.js` — login + registro
- `server/middleware/authMiddleware.js` — JWT verify
- `server/db.js` — pool pg

## Endpoints `/api/trasteros`

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/trasteros` | No | Lista artículos. Query: `?q=texto&usuario_id=X` |
| GET | `/api/trasteros/contenedor` | Sí | Trasteros-contenedor del usuario |
| GET | `/api/trasteros/:nombre` | No | Artículo por nombre |
| POST | `/api/trasteros` | Sí | Crear artículo (multipart/form-data) |
| PUT | `/api/trasteros/:id` | Sí | Editar artículo (multipart/form-data) |
| DELETE | `/api/trasteros/:id` | Sí | Eliminar artículo (cascade imágenes) |
| DELETE | `/api/trasteros/:id/imagenes/:pos` | Sí | Eliminar imagen suelta |

## Helpers en trasteros.js
- `buildExtras(row)` — reconstruye objeto `{ km, anio, ... }` desde columnas planas
- `parseExtras(body)` — extrae valores tipados del body (int/float/string o null)
- `SELECT_ARTICULO` — SELECT canónico con JOIN imagenes_detalle → trasteros → imagenes, usa `json_agg FILTER (WHERE i.id IS NOT NULL)`
- `formatearTrastero(row)` — devuelve shape `{ id, Nombre, Categoria, Extras, Ruta, Imagen1..4, ... }`

## Shape de respuesta (frontend espera esto)
```js
{
  id, trastero_id, Nombre, Categoria, Subcategoria, Descripcion,
  Precio, Negociable, AceptaCambio,
  Extras: { km, anio, combustible, cv, metros, habitaciones, banos },
  Ruta, Imagen1, Imagen2, Imagen3, Imagen4
}
```

## Lógica POST (crear artículo)
1. Recibe `trastero_id` del body
2. Si falta o es NaN → busca el primer trastero del usuario o crea uno
3. Valida que el trastero pertenece al usuario (ownership check)
4. INSERT en `imagenes_detalle` + INSERT en `imagenes` (con ambos FK)

## Auth (auth.js)
- POST `/api/auth/login` — devuelve JWT
- POST `/api/auth/register` — crea usuario + auto-crea trastero "Mi Trastero"
- Token: `localStorage.getItem('trastero_token')`

## Multer
- Destino: `server/public/uploads/{usuario_id}/`
- Límite: 4 imágenes, 5MB/imagen, solo `image/*`
- Errores multer capturados inline → siempre responde JSON (nunca HTML)

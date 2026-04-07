# 📦 Trastero — Estado del Proyecto

> 📌 **Este archivo está en git** — sin credenciales. Las contraseñas van solo en `server/.env` (no subir).
> Última actualización: 2026-04-07

---

## 🗂️ ¿Qué es este proyecto?

Aplicación web para gestión y visualización de trasteros/almacenes.
Los usuarios pueden ver la galería pública sin sesión. Con sesión pueden gestionar su perfil y sus propios artículos (subir, ver, editar, eliminar).

---

## 🖥️ Cómo arrancar en una PC nueva

### Requisitos previos
- Node.js (v18+)
- PostgreSQL instalado y corriendo
- Git

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Drobles-code/Trastero.git
cd Trastero

# 2. Instalar dependencias del frontend
npm install

# 3. Instalar dependencias del backend
cd server
npm install

# 4. Crear el archivo de credenciales del servidor
# Crear: server/.env  (ver sección Credenciales)

# 5. Crear la base de datos en PostgreSQL
# Abrir pgAdmin o psql y ejecutar:
# CREATE DATABASE "Trastero";
# Luego ejecutar server/schema.sql y server/seed.sql

# 6. Arrancar el backend (Terminal 1)
cd server
node server.js     # → http://localhost:5000

# 7. Arrancar el frontend (Terminal 2)
cd ..
npm start          # → http://localhost:3000
```

### Verificar que funciona
```
http://localhost:5000/api/health  → { "status": "ok" }
http://localhost:3000             → Pantalla principal con galería
```

---

## 🔑 Credenciales (server/.env)

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=trastero
DB_USER=postgres
DB_PASSWORD=<contraseña local — no en git>
JWT_SECRET=<secreto local — no en git>
API_URL=http://localhost:5000
PORT=5000
```

> Las contraseñas reales están solo en `server/.env` de tu PC. Créalo manualmente en cada máquina.

**Frontend `.env.local`** (raíz del proyecto — tampoco en git):
```env
REACT_APP_API_URL=http://localhost:5000
```

---

## 🗄️ Base de Datos — PostgreSQL

**Nombre:** `Trastero`
**Usuario:** `postgres`
**Contraseña:** `<ver server/.env>`
**Puerto:** `5432`

### Tablas

#### `usuarios`
| Campo | Tipo | Notas |
|-------|------|-------|
| id | SERIAL PK | |
| nombre | VARCHAR(255) | |
| email | VARCHAR(255) | UNIQUE |
| password | VARCHAR(255) | bcrypt hash |
| avatar_url | VARCHAR(500) | dicebear por defecto |
| created_at | TIMESTAMP | NOW() |

#### `trasteros`
| Campo | Tipo | Notas |
|-------|------|-------|
| id | SERIAL PK | |
| nombre | VARCHAR(255) | |
| usuario_id | INT FK | → usuarios |
| categoria | VARCHAR(100) | |
| subcategoria | VARCHAR(100) | |
| descripcion | TEXT | |
| precio | DECIMAL(10,2) | |
| negociable | BOOLEAN | default false |
| acepta_cambio | BOOLEAN | default false |
| extras | JSONB | default '{}' — campos dinámicos por categoría |
| created_at | TIMESTAMP | |

#### `imagenes`
| Campo | Tipo | Notas |
|-------|------|-------|
| id | SERIAL PK | |
| trastero_id | INT FK | → trasteros |
| ruta | VARCHAR(500) | URL completa: {API_URL}/uploads/{userId}/{filename} |
| posicion | INT | 1=principal, 2-4=adicionales |

#### `categorias`
| Campo | Tipo |
|-------|------|
| id | SERIAL PK |
| nombre | VARCHAR(100) UNIQUE |
| descripcion | TEXT |

#### `preferencias_usuario`
Guarda el tema de color por usuario (background, text, accent, modal, navbar, card_title).

#### `sys_operators`
| Campo | Tipo | Notas |
|-------|------|-------|
| id | SERIAL PK | |
| nombre | VARCHAR(255) | |
| email | VARCHAR(255) | UNIQUE |
| password | VARCHAR(255) | bcrypt hash |
| activo | BOOLEAN | default true |
| created_at | TIMESTAMP | |
| last_login | TIMESTAMP | se actualiza en cada login |

---

## 🌐 API — Endpoints

| Método | Ruta | Auth | Body | Respuesta |
|--------|------|------|------|-----------|
| GET | `/api/health` | — | — | `{ status, timestamp }` |
| GET | `/api/trasteros` | — | — | Array de trasteros |
| GET | `/api/trasteros?q=texto` | — | — | Filtrado por nombre |
| GET | `/api/trasteros?usuario_id=X` | — | — | Trasteros de un usuario |
| GET | `/api/trasteros/:nombre` | — | — | Trastero individual |
| POST | `/api/trasteros` | JWT Bearer | multipart: campos + `imagenes[]` | Trastero creado |
| PUT | `/api/trasteros/:id` | JWT Bearer | multipart: campos + `slots_info` + `imagenes[]` | Trastero actualizado |
| DELETE | `/api/trasteros/:id` | JWT Bearer | — | `{ ok: true }` |
| DELETE | `/api/trasteros/:id/imagenes/:pos` | JWT Bearer | — | Trastero actualizado o `{ deleted: true }` |
| POST | `/api/auth/login` | — | `{ email, password }` | `{ token, usuario }` |
| POST | `/api/auth/registro` | — | `{ nombre, email, password }` | `{ token, usuario }` |
| POST | `/api/ops/login` | — | `{ email, password }` | `{ token, operator }` |
| GET | `/api/ops/usuarios` | JWT operator | — | Lista de usuarios |
| GET | `/api/ops/stats` | JWT operator | — | `{ usuarios: N, trasteros: N }` |

### Subida y edición de imágenes
- Multer guarda en `server/public/uploads/{usuario_id}/{timestamp}-{random}.ext`
- Express sirve la carpeta como estática: `GET /uploads/{usuario_id}/{filename}`
- Límite: 4 imágenes por artículo, 5 MB por imagen, solo `image/*`
- **slots_info**: JSON array enviado con PUT para indicar el estado de cada slot: `'existente'|'nueva'|'vacio'`
  - `existente` → no tocar
  - `nueva` → insertar/reemplazar con archivo subido
  - `vacio` → borrar imagen de DB y disco
- El servidor procesa cada slot por posición (1-4) de forma independiente

### Formato de respuesta de trastero
```json
{
  "id": 1,
  "Nombre": "coche",
  "Ruta": "http://localhost:5000/uploads/3",
  "Imagen1": "1712345678-abc.jpg",
  "Imagen2": "1712345679-def.jpg",
  "Imagen3": null,
  "Imagen4": null,
  "Precio": 1500,
  "Descripcion": "Buen estado",
  "Negociable": true,
  "AceptaCambio": false,
  "Categoria": "Motor",
  "Subcategoria": "Coches",
  "Extras": { "km": "15000", "anio": "2018", "combustible": "Gasolina" }
}
```

---

## 🏗️ Stack Técnico

### Frontend
| Paquete | Versión |
|---------|---------|
| React | 18.2.0 |
| React Router DOM | 6.15.0 |
| Styled Components | 6.0.0 |
| Axios | 1.6.0 |
| CRA (react-scripts) | 5.0.1 |

### Backend
| Paquete | Versión |
|---------|---------|
| Express | 4.18.2 |
| bcrypt | 5.1.1 |
| jsonwebtoken | 9.0.2 |
| pg (PostgreSQL) | 8.11.3 |
| multer | 1.4.5 |
| dotenv | 16.3.1 |
| nodemon (dev) | 3.0.1 |

---

## 📁 Estructura de archivos clave

```
Trastero/
├── public/index.html                  ← fondo oscuro pre-React (sin destello)
├── src/
│   ├── App.js                         ← rutas, estado usuario, handleLogin/Logout
│   ├── context/ThemeContext.js        ← tema global con localStorage
│   ├── constants/categorias.js        ← árbol categorías/subcategorías + CAMPOS_EXTRA + formatExtra()
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── SignInContent.jsx      ← login → POST /api/auth/login
│   │   │   └── SignUpContent.jsx      ← registro → POST /api/auth/registro
│   │   ├── Modal/
│   │   │   ├── ModalLogin.jsx         ← modal overlay reutilizable
│   │   │   ├── ModalSubir.jsx         ← crear artículo (todos los campos)
│   │   │   └── ModalEditar.jsx        ← editar artículo (pre-rellena desde DB, slots_info)
│   │   └── Formularios/
│   │       ├── Header/Navbar.jsx      ← nav, modal auth, chip usuario
│   │       ├── Principal/Principal.js ← galería principal
│   │       ├── Cargarimg/
│   │       │   ├── Cargaimg.js        ← AdaptiveGrid (export) + Cargaimg class
│   │       │   └── Cargaimg.css       ← estilos: location-listing, titulo-tras, item
│   │       └── De/De.js               ← vista detalle con grid centrado
│   └── pages/
│       ├── MiTrastero.jsx             ← galería personal: vista agrupada + vista plana + lightbox
│       ├── Profile.jsx                ← perfil: datos personales + dirección + imagen trastero + ranking
│       ├── Settings.jsx               ← selector de tema
│       ├── OpsLogin.jsx               ← login panel operadores (/ops/login)
│       └── OpsDashboard.jsx           ← dashboard operadores (/ops/dashboard)
├── server/
│   ├── server.js                      ← Express, puerto 5000, sirve /uploads, error handler JSON
│   ├── db.js                          ← pool PostgreSQL
│   ├── .env                           ← credenciales (NO en git)
│   ├── public/uploads/                ← imágenes subidas por usuarios
│   ├── middleware/
│   │   ├── authMiddleware.js          ← verifica JWT Bearer → req.usuario
│   │   └── requireOperator.js        ← verifica JWT tipo:'operator'
│   └── routes/
│       ├── auth.js                    ← login + registro usuarios
│       ├── trasteros.js               ← CRUD trasteros + multer + slots_info
│       └── ops.js                     ← panel operadores
└── ESTADO_PROYECTO.md                 ← este archivo (en git, sin credenciales)
```

---

## 🔐 Sistema de operadores (mantenimiento)

| Item | Detalle |
|---|---|
| URL de acceso | `http://localhost:3000/ops/login` |
| Ruta backend | `POST /api/ops/login` |
| Middleware | `server/middleware/requireOperator.js` |
| JWT | `{ tipo: 'operator' }` — incompatible con tokens de usuarios |
| Dashboard | `/ops/dashboard` — stats + lista de usuarios |

> La URL no aparece en ningún menú ni enlace de la app.

---

## ✅ Funcionalidades implementadas

- [x] Galería principal con CSS Grid (visible sin login)
- [x] Lazy loading de imágenes
- [x] Fondo oscuro pre-React (sin destello blanco)
- [x] Buscador en tiempo real + búsqueda en BD
- [x] Modal de login/registro unificado en Navbar
- [x] Auth real: bcrypt + JWT + PostgreSQL
- [x] Chip avatar+nombre en navbar al iniciar sesión
- [x] Tema global personalizable con localStorage
- [x] Panel de operadores interno (`/ops/login` + `/ops/dashboard`)
- [x] **Mi Trastero** (`/mi-trastero`) — galería personal protegida con JWT
  - [x] Vista agrupada: imagen grid sin barra de título + datos debajo (precio 18px, nombre, descripción, extras, badges)
  - [x] Vista plana: imagen individual con lightbox + datos completos (20px) + Editar/Eliminar
  - [x] Lightbox con navegación teclado (←→ Esc) y puntos indicadores
  - [x] Hover overlay con botones Editar / Eliminar sobre la zona de imágenes
  - [x] CardWrapper con borde blanco, border-radius, overflow:hidden
- [x] **AdaptiveGrid** (`Cargaimg.js`) — grid adaptativo a 1/2/3/4 imágenes, prop `width` opcional
- [x] **ModalSubir** — crear artículo: nombre, categoría, subcategoría, descripción, precio, negociable, acepta cambio, extras dinámicos, hasta 4 imágenes con preview
- [x] **ModalEditar** — editar artículo: pre-rellena todos los campos, manejo de slots (existente/nueva/vacío), no cierra al hacer clic fuera, ancho 720px responsive
- [x] **Sistema slots_info** — PUT envía FormData con `slots_info` JSON: el servidor procesa cada posición de imagen de forma independiente (no borra todo y reinsertar)
- [x] **Error handler JSON global** en Express — nunca devuelve HTML en errores
- [x] **Multer inline error capture** en POST/PUT — devuelve JSON si falla validación de archivo
- [x] **Perfil** (`/profile`) — datos personales, dirección, tipo cuenta, imagen de trastero (upload base64 → localStorage), ranking
- [x] DELETE protegido con JWT — borra artículo + imágenes del disco
- [x] DELETE imagen suelta — elimina solo una posición; si era la única, elimina el artículo

---

## 🔜 Próximos pasos

1. **ModalSubir** — aplicar mismas mejoras que ModalEditar (más ancho, misma fila precio/toggles, misma fila categoría/subcategoría)
2. **Búsqueda con filtros** — por categoría, precio, disponibilidad
3. **Página pública de anuncios** — vista para otros usuarios
4. **Responsive / mobile** — media queries completos
5. **Favoritos** — guardar trasteros de otros usuarios
6. **Protección de imágenes por API** — endpoint con JWT en lugar de static directo

---

## 🔐 Notas de seguridad

- El JWT expira en **7 días** y se guarda en `localStorage` como `trastero_token`
- Las contraseñas se hashean con **bcrypt** (10 salt rounds)
- CORS configurado solo para `http://localhost:3000` (desarrollo)
- `express.static` bloquea directory listing — no se puede listar `/uploads/`
- Multer valida tipo MIME (`image/*`) y tamaño (5 MB máx)
- DELETE verifica `usuario_id` del JWT antes de borrar
- Para producción: cambiar JWT_SECRET, DB_PASSWORD, configurar HTTPS

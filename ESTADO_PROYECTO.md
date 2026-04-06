# 📦 Trastero — Estado del Proyecto

> 📌 **Este archivo está en git** — sin credenciales. Las contraseñas van solo en `server/.env` (no subir).
> Última actualización: 2026-04-06

---

## 🗂️ ¿Qué es este proyecto?

Aplicación web para gestión y visualización de trasteros/almacenes.
Los usuarios pueden ver la galería pública sin sesión. Con sesión pueden gestionar su perfil y sus propios artículos (subir, ver, eliminar).

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
| descripcion | TEXT | |
| precio | DECIMAL(10,2) | |
| acepta_cambio | BOOLEAN | default false |
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

#### `trastero_categorias` (many-to-many)
| Campo | Tipo |
|-------|------|
| trastero_id | FK → trasteros |
| categoria_id | FK → categorias |

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
| POST | `/api/trasteros` | JWT Bearer | multipart: `nombre` + `imagenes[]` | Trastero creado |
| DELETE | `/api/trasteros/:id` | JWT Bearer | — | `{ ok: true }` |
| POST | `/api/auth/login` | — | `{ email, password }` | `{ token, usuario }` |
| POST | `/api/auth/registro` | — | `{ nombre, email, password }` | `{ token, usuario }` |
| POST | `/api/ops/login` | — | `{ email, password }` | `{ token, operator }` |
| GET | `/api/ops/usuarios` | JWT operator | — | Lista de usuarios |
| GET | `/api/ops/stats` | JWT operator | — | `{ usuarios: N, trasteros: N }` |

### Subida de imágenes
- Multer guarda en `server/public/uploads/{usuario_id}/{timestamp}-{random}.ext`
- Express sirve la carpeta como estática: `GET /uploads/{usuario_id}/{filename}`
- Límite: 4 imágenes por artículo, 5 MB por imagen
- Solo tipos `image/*`

### Formato de respuesta de trastero
```json
{
  "id": 1,
  "Nombre": "flor",
  "Ruta": "http://localhost:5000/uploads/3",
  "Imagen1": "1712345678-abc.jpg",
  "Imagen2": "1712345679-def.jpg",
  "Imagen3": "",
  "Imagen4": ""
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
├── public/index.html              ← fondo oscuro pre-React (sin destello)
├── src/
│   ├── App.js                     ← rutas, estado usuario, handleLogin/Logout
│   ├── context/ThemeContext.js    ← tema global con localStorage
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── SignInContent.jsx  ← login → POST /api/auth/login
│   │   │   └── SignUpContent.jsx  ← registro → POST /api/auth/registro
│   │   ├── Modal/ModalLogin.jsx   ← modal overlay reutilizable
│   │   └── Formularios/
│   │       ├── Header/Navbar.jsx  ← nav, modal auth, chip usuario
│   │       ├── Principal/Principal.js ← galería principal
│   │       ├── Cargarimg/Cargaimg.js  ← tarjeta con grid adaptativo (1/2/3/4 imgs)
│   │       └── De/De.js           ← vista detalle con grid centrado
│   └── pages/
│       ├── MiTrastero.jsx         ← galería personal del usuario (protegida)
│       ├── SubirTrastero.jsx      ← formulario subida artículo + imágenes
│       ├── Profile.jsx            ← perfil completo (protegido)
│       ├── Settings.jsx           ← selector de tema
│       ├── OpsLogin.jsx           ← login panel operadores (/ops/login)
│       └── OpsDashboard.jsx       ← dashboard operadores (/ops/dashboard)
├── server/
│   ├── server.js                  ← Express app, puerto 5000, sirve /uploads
│   ├── db.js                      ← pool PostgreSQL
│   ├── .env                       ← credenciales (NO en git)
│   ├── public/uploads/            ← imágenes subidas por usuarios
│   ├── middleware/
│   │   ├── authMiddleware.js      ← verifica JWT Bearer → req.usuario
│   │   └── requireOperator.js    ← verifica JWT tipo:'operator'
│   └── routes/
│       ├── auth.js                ← login + registro usuarios
│       ├── trasteros.js           ← GET/POST/DELETE trasteros + multer
│       └── ops.js                 ← panel operadores
└── ESTADO_PROYECTO.md             ← este archivo (en git, sin credenciales)
```

---

## 🔐 Sistema de operadores (mantenimiento)

Acceso separado de usuarios normales — tabla `sys_operators`.

| Item | Detalle |
|---|---|
| URL de acceso | `http://localhost:3000/ops/login` |
| Ruta backend | `POST /api/ops/login` |
| Middleware | `server/middleware/requireOperator.js` |
| JWT | `{ tipo: 'operator' }` — incompatible con tokens de usuarios |
| Dashboard | `/ops/dashboard` — stats + lista de usuarios |
| Rutas protegidas | `GET /api/ops/usuarios`, `GET /api/ops/stats` |

> La URL no aparece en ningún menú ni enlace de la app.

---

## ✅ Funcionalidades implementadas

- [x] Galería principal con CSS Grid (visible sin login)
- [x] Carga inmediata desde JSON, API en background (3s timeout)
- [x] Lazy loading de imágenes
- [x] Fondo oscuro pre-React (sin destello blanco)
- [x] Buscador en tiempo real + búsqueda en BD
- [x] Modal de login/registro unificado en Navbar
- [x] Auth real: bcrypt + JWT + PostgreSQL
- [x] Chip avatar+nombre en navbar al iniciar sesión
- [x] Perfil completo: dirección, teléfono, tipo persona/empresa, ranking
- [x] Tema global personalizable con localStorage
- [x] Menú cierra al hacer clic fuera
- [x] Panel de operadores interno (`/ops/login` + `/ops/dashboard`) — sin enlace en navbar
- [x] Middleware `requireOperator` — JWT separado del de usuarios normales
- [x] **Mi Trastero** (`/mi-trastero`) — galería personal con grid, acciones hover, eliminar con confirmación
- [x] **Subir artículo** (`/subir`) — formulario multer con slots de imagen, vista previa adaptativa, badge "PRINCIPAL"
- [x] **Grid adaptativo** en tarjetas — se adapta a 1/2/3/4 imágenes sin slots vacíos
- [x] **Centrado de grid** en vista detalle — último artículo centrado
- [x] **DELETE** protegido con JWT — borra artículo + imágenes del disco

---

## 🔜 Próximos pasos

1. **Búsqueda con filtros** por categoría, precio, disponibilidad
2. **Detalle de trastero propio** — vista individual al hacer clic desde Mi Trastero
3. **Editar artículo** — modificar nombre e imágenes
4. **Protección de imágenes por API** — endpoint con JWT en lugar de static directo
5. **Favoritos** — guardar trasteros de otros usuarios
6. **Auth social** (Google/Microsoft) — pendiente decisión de arquitectura
7. **Responsive / mobile** — media queries completos

---

## 🔐 Notas de seguridad

- El JWT expira en **7 días** y se guarda en `localStorage` como `trastero_token`
- Las contraseñas se hashean con **bcrypt** (10 salt rounds)
- CORS configurado solo para `http://localhost:3000` (desarrollo)
- `express.static` bloquea directory listing — no se puede listar `/uploads/`
- Multer valida tipo MIME (`image/*`) y tamaño (5 MB máx)
- DELETE verifica `usuario_id` del JWT antes de borrar (no se puede borrar artículos ajenos)
- Para producción: cambiar JWT_SECRET, DB_PASSWORD, configurar HTTPS y protección de imágenes por API

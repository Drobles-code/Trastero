# 📦 Trastero — Estado del Proyecto

> 📌 **Este archivo está en git** — sin credenciales. Las contraseñas van solo en `server/.env` (no subir).
> Última actualización: 2026-04-02

---

## 🗂️ ¿Qué es este proyecto?

Aplicación web para gestión y visualización de trasteros/almacenes.
Los usuarios pueden ver la galería pública sin sesión. Con sesión pueden gestionar su perfil y (próximamente) sus propios trasteros.

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
# (copiar el contenido de la sección "Credenciales" más abajo)
# Crear: server/.env

# 5. Crear la base de datos en PostgreSQL
# Abrir pgAdmin o psql y ejecutar:
# CREATE DATABASE "Trastero";
# Luego ejecutar server/schema.sql y server/seed.sql

# 6. Arrancar el backend (Terminal 1)
cd server
npm run dev        # → http://localhost:5000

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
DB_NAME=Trastero
DB_USER=postgres
DB_PASSWORD=<contraseña local — no en git>
JWT_SECRET=<secreto local — no en git>
PORT=5000
```

> Las contraseñas reales están solo en `server/.env` de tu PC. Créalo manualmente en cada máquina.

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
| ruta | VARCHAR(500) | ruta completa con filename |
| posicion | INT | 1 a 4 |

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

---

## 🌐 API — Endpoints

| Método | Ruta | Body | Respuesta |
|--------|------|------|-----------|
| GET | `/api/health` | — | `{ status, timestamp }` |
| GET | `/api/trasteros` | — | Array de trasteros |
| GET | `/api/trasteros?q=texto` | — | Filtrado por nombre |
| GET | `/api/trasteros/:nombre` | — | Trastero individual |
| POST | `/api/auth/login` | `{ email, password }` | `{ token, usuario }` |
| POST | `/api/auth/registro` | `{ nombre, email, password }` | `{ token, usuario }` |

### Formato de respuesta de trastero
```json
{
  "id": 1,
  "Nombre": "flor",
  "Ruta": "img-gif/Gif-101TNF18",
  "Imagen1": "29194001.jpg",
  "Imagen2": "29194002.jpg",
  "Imagen3": "29194004.jpg",
  "Imagen4": "29194005.jpg"
}
```

### Formato de respuesta de auth
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "usuario": {
    "id": 1,
    "nombre": "Dorian",
    "email": "dorian@email.com",
    "avatar_url": "https://api.dicebear.com/..."
  }
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
| dotenv | 16.3.1 |
| nodemon (dev) | 3.0.1 |

---

## 📁 Estructura de archivos clave

```
Trastero/
├── public/index.html          ← fondo oscuro pre-React (sin destello)
├── src/
│   ├── App.js                 ← rutas, estado usuario, handleLogin/Logout
│   ├── context/ThemeContext.js ← tema global con localStorage
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── SignInContent.jsx  ← login → POST /api/auth/login
│   │   │   └── SignUpContent.jsx  ← registro → POST /api/auth/registro
│   │   ├── Modal/ModalLogin.jsx   ← modal overlay reutilizable
│   │   └── Formularios/
│   │       ├── Header/Navbar.jsx  ← nav, modal auth, chip usuario
│   │       ├── Principal/Principal.js ← galería principal
│   │       └── Cargarimg/Cargaimg.js  ← tarjeta de trastero
│   └── pages/
│       ├── Profile.jsx        ← perfil completo (protegido)
│       └── Settings.jsx       ← selector de tema
├── server/
│   ├── server.js              ← Express app, puerto 5000
│   ├── db.js                  ← pool PostgreSQL
│   ├── .env                   ← credenciales (NO en git)
│   └── routes/
│       ├── auth.js            ← login + registro
│       └── trasteros.js       ← GET trasteros
└── ESTADO_PROYECTO.md         ← este archivo (NO en git)
```

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

---

## 🔜 Próximos pasos

1. **Pantalla de carga de imágenes** con categorías → desbloquea filtros de búsqueda
2. **Búsqueda con filtros** por categoría, precio, disponibilidad
3. **Galería personal** (Mis trasteros) — ver/editar/eliminar los propios
4. **Detalle de trastero** — vista individual al hacer clic en tarjeta
5. **Favoritos** — guardar trasteros de otros usuarios
6. **Auth social** (Google/Microsoft) — pendiente decisión de arquitectura
7. **Responsive / mobile** — media queries completos

---

## 🔐 Notas de seguridad

- El JWT expira en **7 días** y se guarda en `localStorage` como `trastero_token`
- Las contraseñas se hashean con **bcrypt** (10 salt rounds)
- CORS configurado solo para `http://localhost:3000` (desarrollo)
- Para producción: cambiar JWT_SECRET, DB_PASSWORD y configurar HTTPS

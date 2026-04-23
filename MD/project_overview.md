---
name: project_overview
description: Visión general del proyecto Trastero — stack, estado y próximos pasos. Cargar siempre al inicio.
type: project
---

# Proyecto Trastero

App React + Node/Express + PostgreSQL para venta de artículos de segunda mano.

**Repo:** https://github.com/Drobles-code/Trastero.git · rama `main`
**Ruta local:** `C:\Users\drobl\Desktop\CLAUDE\proyectos\Trastero`
**Puertos:** Frontend :3000 · Backend :5000 · BD PostgreSQL :5432

## Stack
- **Frontend:** React 18, React Router 6, Styled Components 6, CRA
- **Backend:** Node/Express, PostgreSQL (pg), JWT, Bcrypt, Multer, Sharp
- **BD:** PostgreSQL — esquema v2 (ver `project_database.md`)

## Arrancar
```
iniciar.bat          → backend + frontend
actualizar.bat       → git pull + npm install
SETUP.bat            → primer uso en PC nuevo
```
- BD: `net start postgresql-x64-18` (admin)
- server/.env NO está en repo — usar `server/.env.example`
- **CRÍTICO**: `DB_NAME=Trastero` (T mayúscula)

## Estado (2026-04-23)
- ✅ CRUD artículos completo con campos tipados por categoría
- ✅ Auth JWT + bcrypt
- ✅ Tema personalizable (ThemeContext + localStorage)
- ✅ Lightbox fullscreen en modal detalle
- ✅ Toggle Grupo/Todas en MiTrastero y De.js
- ✅ Categorías y subcategorías desde BD (`GET /api/categorias`)
- ✅ Thumbnails WebP con Sharp (Thumb1..4)
- ✅ Panel operadores `/ops/login` (rutas sys_operators, invisible en menú)
- ✅ **Refactoring 2026-04-23:**
  - `utils/colorUtils.js` + `utils/api.js` — utilidades centralizadas
  - `components/ImageGrid/` — AdaptiveGrid, DetailGrid, PreviewGrid compartidos
  - `Cargaimg.js` → componente funcional + Styled Components (eliminado único class component)
  - Lazy loading en todos los modales (Navbar + MiTrastero)
  - Settings: colores corregidos, paleta ampliada
  - Principal.css: eliminado `background-color` del `*` que rompía temas

## Próximos pasos
- Settings → guardar tema en backend (tabla `preferencias_usuario`)
- Profile → datos reales desde BD
- Dividir `MiTrastero.jsx` en componentes más pequeños
- Panel mantenimiento `/admin` (puerto 3001) — operadores, audit log
- Buscador global en navbar
- Responsive / mobile

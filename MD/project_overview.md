---
name: project_overview
description: Visión general del proyecto Trastero — stack, repo, carpetas, próximos pasos. Cargar siempre al inicio de conversación.
type: project
---

# Proyecto Trastero

App React + Node/Express + PostgreSQL para venta de artículos de segunda mano. Galería de imágenes, auth JWT, tema personalizable por usuario.

**Versión:** 2.1.0 (en desarrollo)
**Repo:** https://github.com/Drobles-code/Trastero.git
**Rama principal:** main
**App corre en:** `C:\Users\drobl\Desktop\CLAUDE\proyectos\Trastero`

## Stack
- **Frontend:** React 18.2.0, React Router DOM 6.15.0, Styled Components 6.0.0, CRA
- **Backend:** Node.js + Express, PostgreSQL, Multer (img upload), JWT, Bcrypt
- **BD:** PostgreSQL esquema v2 (ver `project_database.md`)

## Estructura de carpetas
```
src/
  constants/categorias.js        — árbol categorías + CAMPOS_EXTRA + formatExtra()
  context/ThemeContext.js        — tema global (background, modalBg, accent, navbar, cardTitle)
  components/Modal/
    ModalSubir.jsx               — crear artículo
    ModalEditar.jsx              — editar artículo
  components/Formularios/
    Cargarimg/Cargaimg.js        — tarjeta pública (página principal)
    Principal/Principal.js       — grid página pública
    De/De.js                     — detalle artículo
  pages/MiTrastero.jsx           — área privada del usuario
server/
  server.js
  routes/trasteros.js            — CRUD artículos
  routes/auth.js                 — login + registro
  middleware/authMiddleware.js
database/
  schema.sql                     — esquema v2
  seed.sql                       — datos de prueba
  trastero_latest.sql            — backup completo BD (se sube al repo, se restaura con actualizar.bat)
  backup_trastero_*.backup       — respaldos pg_dump binarios (ignorados por git)
SETUP.bat                        — configuración primer uso en PC nuevo
actualizar.bat                   — git pull + npm install (para actualizar el proyecto)
iniciar.bat                      — arrancar backend + frontend
```

## Estado (2026-04-12)
- CRUD artículos completo, BD migrada a esquema v2
- Campos tipados por categoría (Motor, Inmobiliaria)
- Tema personalizable por usuario (ThemeContext + preferencias_usuario en BD)
- Lightbox conectado al modal de detalle en MiTrastero (click foto → galería fullscreen)
- SETUP.bat para configurar el proyecto en un PC nuevo desde cero
- server/.env excluido del repo (credenciales seguras, usar server/.env.example como plantilla)

## Pendiente al actualizar
> Revisar esta sección cada vez que hagas `actualizar.bat` en otro PC.
> Cuando esté vacía, solo con `actualizar.bat` es suficiente.

_(sin pendientes por ahora)_

## Próximos pasos
- Categorías dinámicas desde BD (tabla `categorias`)
- Ubicación física del trastero (campo `ciudad`/coordenadas en tabla `trasteros`)
- Buscador global persistente en topnav
- Vista pública del marketplace conectada a BD real (Principal + De.js usan Pixabay como placeholder)
- Responsive / mobile
- Múltiples trasteros por usuario (selector en Mi Trastero)

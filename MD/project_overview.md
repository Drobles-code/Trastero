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
  constants/categorias.js        — CAMPOS_EXTRA + formatExtra() (árbol categorías como fallback)
  context/ThemeContext.js        — tema global (background, modalBg, accent, navbar, cardTitle)
  context/CategoriasContext.js   — categorías desde BD (con fallback a JS si API falla)
  utils/
    api.js                       — API_URL (única fuente, process.env.REACT_APP_API_URL)
    colorUtils.js                — getContrastColor() (única fuente, luminancia)
  components/ImageGrid/
    AdaptiveGrid.jsx             — grid 2×2 para tarjetas (ruta+imgs o srcs directas, width)
    DetailGrid.jsx               — grid detalle modal (size: large|medium, onImgClick opcional)
    PreviewGrid.jsx              — grid preview upload/editar (slots con .preview)
  components/Modal/
    ModalSubir.jsx               — crear artículo (lazy loaded)
    ModalEditar.jsx              — editar artículo (lazy loaded)
    ModalLogin.jsx               — contenedor modal genérico (lazy loaded)
  components/Auth/
    SignInContent.jsx            — formulario login (lazy loaded)
    SignUpContent.jsx            — formulario registro (lazy loaded)
  components/Content/
    AboutContent.jsx             — contenido modal About (lazy loaded)
    ContactContent.jsx           — contenido modal Contacto (lazy loaded)
  components/Formularios/
    Cargarimg/Cargaimg.js        — tarjeta pública — componente funcional, Styled Components
    Principal/Principal.js       — grid página pública
    De/De.js                     — vista pública de trastero (toggle Grupo/Todas, modal, lightbox)
    Header/Navbar.jsx            — navbar con lazy loading de modales
  pages/MiTrastero.jsx           — área privada del usuario (lazy loading de modales)
server/
  server.js
  routes/trasteros.js            — CRUD artículos
  routes/auth.js                 — login + registro
  routes/categorias.js           — GET /api/categorias (árbol desde BD)
  routes/ops.js                  — panel operadores sistema
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

## Estado (2026-04-23)
- CRUD artículos completo, BD migrada a esquema v2
- Campos tipados por categoría (Motor, Inmobiliaria)
- Tema personalizable por usuario (ThemeContext + preferencias_usuario en BD)
- Lightbox conectado al modal de detalle en MiTrastero (click foto → galería fullscreen)
- SETUP.bat para configurar el proyecto en un PC nuevo desde cero
- server/.env excluido del repo (credenciales seguras, usar server/.env.example como plantilla)
- Categorías y subcategorías en BD (tablas `categorias` + `subcategorias`), servidas por `GET /api/categorias`
- De.js: vista pública completa de trastero con toggle Grupo/Todas, modal detalle y lightbox
- Coherencia visual tarjetas: título del artículo en barra superior (20px centrado, theme.cardTitle)
- **Refactoring crítico completado (2026-04-23):**
  - `getContrastColor` centralizado en `src/utils/colorUtils.js` (eliminadas 8+ definiciones locales)
  - `API_URL` centralizado en `src/utils/api.js` (eliminadas 13+ definiciones locales)
  - `AdaptiveGrid`, `DetailGrid`, `PreviewGrid` extraídos a `src/components/ImageGrid/` (eliminadas 7 definiciones locales)
  - `Cargaimg.js` convertido a componente funcional + Styled Components (eliminado único class component)
  - `Cargaimg.css` eliminado — estilos migrados a Styled Components
  - Lazy loading aplicado a todos los modales (Navbar + MiTrastero)
  - Settings: normalizeHex, paleta ampliada, contraste corregido
  - Principal.css: eliminado `background-color` del selector `*` (rompía todos los temas)

## Pendiente al actualizar
> Revisar esta sección cada vez que hagas `actualizar.bat` en otro PC.
> Cuando esté vacía, solo con `actualizar.bat` es suficiente.

_(sin pendientes por ahora)_

## Próximos pasos
- Settings → guardar tema en backend (tabla `preferencias_usuario`)
- Profile → conectar al backend (datos reales)
- Dividir MiTrastero.jsx en componentes más pequeños
- Panel mantenimiento `/admin` (puerto 3001) — operadores, audit log
- Ubicación física del trastero (campo `ciudad`/coordenadas)
- Buscador global persistente en topnav
- Responsive / mobile

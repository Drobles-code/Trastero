---
name: project_frontend
description: Frontend React — componentes, páginas, estilos, grids, modales, ThemeContext. Cargar al tocar src/.
type: project
---

# Frontend — React + Styled Components

## Utilidades compartidas
| Archivo | Exporta | Uso |
|---|---|---|
| `src/utils/api.js` | `API_URL` | Importar en cualquier fetch al backend |
| `src/utils/colorUtils.js` | `getContrastColor(hex)` | Devuelve `#000`/`#fff` según luminancia |

## ThemeContext
`src/context/ThemeContext.js`
- Props: `background, text, accent, modalBg, navbar, cardTitle`
- Default: `background:'#000', accent:'#667eea', modalBg:'#1a1a1a'`
- Persiste en `localStorage` como `appTheme`

## ImageGrid — componentes compartidos (`src/components/ImageGrid/`)

### AdaptiveGrid.jsx — grid 2×2 para tarjetas
Props: `ruta`, `imgs`, `thumbs`, `srcs` (URLs directas, alternativa a ruta+imgs), `width` (default `'244px'`)
- n=1: full `height:168px` · n=2: dos cols `168px` · n=3: 2×`84px` + 1 span · n=4: 2×2 `84px`
- Imágenes: `border: 2px solid rgb(247 247 251)` — **obligatorio, no quitar**
- Usado en: Cargaimg, De.js, MiTrastero, SubirTrastero

### DetailGrid.jsx — grid clickable en modales de detalle
Props: `ruta`, `imgs`, `onImgClick?`, `size: 'large'|'medium'` (default `'large'`)
- large: 1→320px, 2→240px, 3-4→160px · medium: 1→300px, 2→220px, 3-4→160px
- Cursor `zoom-in` automático si `onImgClick` presente
- Usado en: MiTrastero (large), De.js (medium)

### PreviewGrid.jsx — preview compacto en formularios
Props: `slots` → `Array<{preview: string}|null>`
- 1→140px · 2→110px · 3-4→90px
- Usado en: ModalSubir, ModalEditar

## Lazy Loading — modales
Todos los modales usan `React.lazy` + `<Suspense fallback={null}>`.
- **Navbar:** ModalLogin, SignInContent, SignUpContent, AboutContent, ContactContent
- **MiTrastero:** ModalSubir, ModalEditar

## Páginas principales
| Página | Ruta | Notas |
|---|---|---|
| `Principal.js` | `/` | Grid público de artículos |
| `De.js` | `/De/:nombre` | Vista pública trastero — toggle Grupo/Todas, modal, lightbox |
| `MiTrastero.jsx` | `/mi-trastero` | Área privada — requiere login |
| `Settings.jsx` | `/settings` | Configuración de tema |
| `Profile.jsx` | `/profile` | Perfil de usuario |

## MiTrastero.jsx — puntos clave
- `PageWrapper` recibe `bg={theme.background}` (obligatorio para el fondo)
- Fetcha `trasteroId` → `GET /api/trasteros/contenedor` → pasa a `<ModalSubir>`
- Toggle `vistaPlana`: false=tarjetas (Grid), true=imágenes sueltas (FlatGrid)
- Lightbox: `useState(null)` → `{ imgs:[], idx:0 }` · teclado: Escape/ArrowLeft/ArrowRight

### TrasteroCard
- Barra título arriba: `theme.cardTitle`, 20px centrado
- AdaptiveGrid debajo del título con `width="100%"`
- Hover overlay: botones Editar / Eliminar
- FlatInfo: precio, descripción, extras, badges

## Cargaimg.js — tarjeta pública
Componente **funcional** (convertido 2026-04-23). Sin CSS externo.
- Styled: `CardLink, CardArticle, TitleBar, TitleAvatar, TitleText`
- `Cargaimg.css` eliminado — **no importar**

## Modales

### ModalSubir.jsx
- Prop `trasteroId` → append FormData
- Click fuera NO cierra — solo botón ✕
- `TogglePill`: desmarcado=`accent22`, marcado=`accent` sólido
- Box: `max-width:680px` · slots imagen: `80×80px`

### ModalEditar.jsx
- Maneja `slots_info` JSON (imágenes nuevas/vacías/existentes)
- Box: `max-width:720px` · mobile ≤600px: `max-height:95vh`

### ModalLogin.jsx
- Contenedor genérico para SignIn/SignUp/About/Contact
- Box: `max-width:450px` · mobile ≤768px: `max-width:90%`

## Imágenes — dos versiones por foto
- `Imagen1..4` → original JPG/PNG — usado en lightbox
- `Thumb1..4` → thumbnail WebP 800px — usado en cards (fallback: `Thumb1 || Imagen1`)

## Categorías
- `CategoriasContext` carga desde `GET /api/categorias` con fallback a `categorias.js`
- `CAMPOS_EXTRA` en `constants/categorias.js` — campos dinámicos por categoría
- `formatExtra(extras)` — formatea para mostrar en tarjeta

## Patrones de estilo
- Tarjetas: `border: 2px solid rgb(247,247,251)` · `border-radius: 10px`
- Badges: `bg: accent22` · `border: 1px solid accent44` · `color: accent`
- Separador img/info: `border-top: 2px solid rgb(247,247,251)` en FlatInfo
- Props SC con colores: usar `bg`, `accent`, `color` — NO `bgColor`/`textColor` (generan warning DOM en SC v6)

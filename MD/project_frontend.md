---
name: project_frontend
description: Frontend React — componentes, páginas, estilos, AdaptiveGrid, ThemeContext. Cargar al tocar src/, páginas, modales o estilos.
type: project
---

# Frontend — React + Styled Components

## Páginas principales
- `src/pages/MiTrastero.jsx` — área privada, requiere login
- `src/components/Formularios/Principal/Principal.js` — página pública, grid de artículos
- `src/components/Formularios/De/De.js` — vista pública de trastero: toggle Grupo/Todas, modal detalle, lightbox

## Tema global — ThemeContext
`src/context/ThemeContext.js`
- Propiedades: `background, text, accent, modalBg, navbar, cardTitle`
- Default: `background: '#000', accent: '#667eea', modalBg: '#1a1a1a'`
- Se guarda en `localStorage` como `appTheme`
- MiTrastero usa `theme.background` para el fondo del `PageWrapper`

## AdaptiveGrid — DOS versiones independientes

| Archivo | Constante | Border imágenes |
|---|---|---|
| `Cargaimg.js` | `IMG_BASE` | `border: '2px solid rgb(247 247 251)'` ✓ |
| `MiTrastero.jsx` | `IMG_BASE_CARD` | `border: '2px solid rgb(247 247 251)'` ✓ |

> CRÍTICO: IMG_BASE_CARD DEBE tener el border. Sin él las imágenes se pegan sin separación visual.

### Layouts AdaptiveGrid
- n=1: imagen full `gridColumn:1/3, height:168px`
- n=2: dos columnas `height:168px`
- n=3: 2×`84px` arriba + 1 full `84px` abajo con `marginTop:'-4px'`
- n=4: 2×2 `84px` con `marginTop:'-4px'` en fila inferior

### Props AdaptiveGrid
- `ruta` — base URL de la carpeta del usuario
- `imgs` — array de filenames originales (JPG/PNG) — se usa en lightbox
- `thumbs` — array de filenames WebP thumbnail — se usa en las cards (fallback a `imgs` si vacío)
- `width` — ancho opcional del grid

### Diferencia Cargaimg vs MiTrastero
Ambas tienen el mismo border. La diferencia es que MiTrastero NO tiene `export` en AdaptiveGrid (es función local).

## Imágenes — dos versiones por foto
Desde el servidor se reciben dos rutas por imagen:
- `Imagen1..4` → original JPG/PNG (calidad máxima) — usado en **lightbox**
- `Thumb1..4` → thumbnail WebP 800px (ligero) — usado en **cards y grids**

Fallback: `Thumb1 || Imagen1` → si una imagen fue subida antes del sistema de thumbs, usa el original.

```js
// En Cargaimg.js y MiTrastero.jsx
const thumbs = [
  task.Thumb1 || task.Imagen1,
  task.Thumb2 || task.Imagen2,
  task.Thumb3 || task.Imagen3,
  task.Thumb4 || task.Imagen4,
];
```

## MiTrastero.jsx — puntos clave
- `PageWrapper` recibe `bg={theme.background}` (obligatorio para el fondo)
- `CountBadge` — texto plano con color `accent`, sin pill/borde
- `FlatInfo` tiene `border-top: 2px solid rgb(247,247,251)` (separador imágenes/texto)
- Fetcha `trasteroId` en `useEffect` → `GET /api/trasteros/contenedor` → pasa a `<ModalSubir>`
- Vista grupo (defecto) + Vista plana (toggle, igual que De.js)

### TrasteroCard — estructura tarjeta
- **Barra de título** arriba: `theme.cardTitle`, 20px centrado, nombre del artículo (sin repetirse abajo)
- **AdaptiveGrid** — fotos debajo del título
- **FlatInfo** — precio, descripción, extras, badges (ya NO incluye CardNombre)
- Hover overlay con botones Editar / Eliminar

### Lightbox (galería fullscreen)
- Estado: `const [lightbox, setLightbox] = useState(null); // { imgs: [], idx: 0 }`
- Teclado: Escape cierra, ArrowLeft/ArrowRight navegan
- JSX al final del return (z-index 3000)
- **Conectado al modal de detalle**: click en foto de `DetailGrid` → abre lightbox

### DetailGrid
- Props: `{ ruta, imgs, onImgClick }`
- `onImgClick(i)` — callback con índice de la foto clickada; si no se pasa, fotos son estáticas
- Cursor `zoom-in` cuando `onImgClick` está presente
- Layouts: 1 foto (320px full), 2 fotos (2 cols 240px), 3 fotos (2+1 span), 4 fotos (2×2)
- Uso en modal de detalle: pasa handler que llama `setLightbox({ imgs: allImgs, idx: i })`

## Modales
### ModalSubir.jsx
- Recibe prop `trasteroId` → append al FormData antes de enviar
- `TogglePill`: sin marcar = fondo `accent22`; marcado = fondo `accent` sólido, texto blanco
- Categoría y Subcategoría en la misma fila (flex row)
- Precio a la izquierda + pills Negociable/Acepto cambio a la derecha (misma fila, flex wrap)
- Click fuera del modal NO cierra → solo cierra el botón ✕

### ModalEditar.jsx
- Mismo estilo `TogglePill` que ModalSubir
- Maneja `slots_info` JSON para saber qué imágenes son nuevas/vacías/existentes

## Medidas de Modales

### ModalSubir (`src/components/Modal/ModalSubir.jsx`)
- **Box**: `max-width: 680px` · `max-height: 90vh` · `padding: 32px 28px 28px`
- **Overlay**: `padding: 20px`
- **CloseBtn**: `32×32px`
- **Input / Select / Textarea**: `padding: 10px 14px`
- **Textarea**: `min-height: 72px`
- **TogglePill**: `padding: 6px 14px` · `border-radius: 20px`
- **Slots de imagen**: `width: 80px` · `height: 80px` · `border-radius: 8px`
- **PreviewGrid alturas**: 1 img → 140px · 2 imgs → 110px · 3-4 imgs → 90px
- **ExtraGrid**: `minmax(120px, 1fr)` · `gap: 10px`

### ModalEditar (`src/components/Modal/ModalEditar.jsx`)
- **Box**: `max-width: 720px` · `max-height: 90vh` · `padding: 32px 32px 28px`
- **Mobile (≤600px)**: `max-height: 95vh` · `padding: 24px 18px 20px` · overlay `padding: 0`
- **TwoCol**: `gap: 12px` (colapsa a 1 col en ≤480px)
- **Slots de imagen**: `width: 80px` · `height: 80px`
- **ExtraGrid**: `minmax(140px, 1fr)` · `gap: 12px`
- **PreviewGrid alturas**: 1 img → 140px · 2 imgs → 110px · 3-4 imgs → 90px

### ModalLogin (`src/components/Modal/ModalLogin.jsx`)
- **Box**: `max-width: 450px` · `max-height: 90vh` · `padding: 55px 40px 40px`
- **Mobile (≤768px)**: `max-width: 90%` · `padding: 55px 20px 30px`
- **CloseButton**: `36×36px`

## Categorías
### CategoriasContext (`src/context/CategoriasContext.js`)
- Carga categorías desde `GET /api/categorias` al montar la app
- Fallback al array de `categorias.js` si la API falla
- Formato normalizado: `{ id, nombre, subs: [{ id, nombre }] }`
- Consumido por `ModalSubir` y `ModalEditar` vía `useContext(CategoriasContext)`

### Campos extra (`src/constants/categorias.js`)
- `CAMPOS_EXTRA` — campos dinámicos por categoría (Motor: km/anio/combustible/cv; Inmobiliaria: metros/habitaciones/banos)
- `formatExtra(extras)` — formatea para mostrar en tarjeta

## Patrones de estilo
- Tarjetas: `border: 2px solid rgb(247, 247, 251)`, `border-radius: 10px`
- Badges: `background: accent22, border: 1px solid accent44, color: accent`
- Separador imagen/info: `border-top: 2px solid rgb(247, 247, 251)` en FlatInfo
- `getContrastColor(hex)` — devuelve `#000` o `#fff` según luminancia del fondo

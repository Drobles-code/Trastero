---
name: project_frontend
description: Frontend React — componentes, páginas, estilos, AdaptiveGrid, ThemeContext. Cargar al tocar src/, páginas, modales o estilos.
type: project
---

# Frontend — React + Styled Components

## Páginas principales
- `src/pages/MiTrastero.jsx` — área privada, requiere login
- `src/components/Formularios/Principal/Principal.js` — página pública, grid de artículos
- `src/components/Formularios/De/De.js` — detalle de artículo

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

### Diferencia Cargaimg vs MiTrastero
Ambas tienen el mismo border. La diferencia es que MiTrastero NO tiene `export` en AdaptiveGrid (es función local).

## MiTrastero.jsx — puntos clave
- `PageWrapper` recibe `bg={theme.background}` (obligatorio para el fondo)
- `CountBadge` — texto plano con color `accent`, sin pill/borde
- `FlatInfo` tiene `border-top: 2px solid rgb(247,247,251)` (separador imágenes/texto)
- Fetcha `trasteroId` en `useEffect` → `GET /api/trasteros/contenedor` → pasa a `<ModalSubir>`
- Vista grupo (defecto) + Vista plana (toggle)

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

### ModalEditar.jsx
- Mismo estilo `TogglePill` que ModalSubir
- Maneja `slots_info` JSON para saber qué imágenes son nuevas/vacías/existentes

## Categorías y campos extra
`src/constants/categorias.js`
- `CAMPOS_EXTRA` — campos dinámicos por categoría (Motor: km/anio/combustible/cv; Inmobiliaria: metros/habitaciones/banos)
- `formatExtra(extras)` — formatea para mostrar en tarjeta

## Patrones de estilo
- Tarjetas: `border: 2px solid rgb(247, 247, 251)`, `border-radius: 10px`
- Badges: `background: accent22, border: 1px solid accent44, color: accent`
- Separador imagen/info: `border-top: 2px solid rgb(247, 247, 251)` en FlatInfo
- `getContrastColor(hex)` — devuelve `#000` o `#fff` según luminancia del fondo

# 📋 RESUMEN TÉCNICO - PROYECTO TRASTERO

## 📌 Información General

**Nombre:** Trastero Moderno
**Versión:** 2.0.0
**Descripción:** Aplicación React para gestión y visualización de trasteros (unidades de almacenamiento) con galería de imágenes, autenticación y tema personalizable.
**Estado:** En desarrollo (Modernización React 17 → React 18)

---

## 🛠️ Stack Tecnológico

### Frontend
- **React:** 18.2.0 (Funcional, Hooks)
- **React Router DOM:** 6.15.0 (Routing SPA)
- **Styled Components:** 6.0.0 (CSS-in-JS)
- **Axios:** 1.6.0 (HTTP requests)
- **React Scripts:** 5.0.1 (Create React App)

### Testing
- @testing-library/react: 14.0.0
- @testing-library/jest-dom: 6.1.4
- @testing-library/user-event: 14.5.1

### Desarrollo
- Node.js + npm
- Git (GitHub: Drobles-code/Trastero)

---

## 📂 Estructura de Carpetas

```
src/
├── components/
│   ├── Formularios/
│   │   ├── Principal/          # Página principal con galería
│   │   │   ├── Principal.js    # Componente de clase (state, filtrado)
│   │   │   ├── Principal.css   # Estilos galería (CSS Grid)
│   │   │   └── Principal.css.backup* (backups de cambios)
│   │   ├── Header/
│   │   │   ├── Navbar.jsx      # Barra navegación (React 18, Hooks)
│   │   │   └── Navs.css
│   │   ├── Modal/
│   │   │   ├── ModalLogin.jsx  # Modal autenticación unificado
│   │   │   └── Modal.css
│   │   ├── Cargarimg/          # Tarjetas galería
│   │   │   ├── Cargaimg.js
│   │   │   └── Cargaimg.css
│   │   ├── Buscador/           # Búsqueda de trasteros
│   │   ├── De/                 # Página detalle trastero
│   │   └── ... (otros componentes)
│   ├── Auth/
│   │   ├── SignInContent.jsx   # Formulario iniciar sesión (modal)
│   │   └── SignUpContent.jsx   # Formulario registro (modal)
│   └── ...
├── pages/
│   ├── SignIn.jsx
│   ├── SignUp.jsx
│   ├── Profile.jsx
│   ├── Settings.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   └── NotFound.jsx
├── context/
│   └── ThemeContext.js         # Global theme state (Context API)
├── App.js                      # Componente raíz, routing
└── ...
```

---

## 🎨 Principales Componentes

### 1. **App.js (Raíz)**
- ThemeProvider (Context API)
- Router (React Router v6)
- AppContainer + ContentWrapper (Styled Components)
- Rutas principales

### 2. **Navbar.jsx (Autenticación unificada)**
- Modal que alterna entre SignIn y SignUp
- Hamburger menu responsivo
- Estado: `authMode` ('signin' | 'signup')
- Props: `onLogin`, `onLogout`, `user`

### 3. **Principal.js (Galería)**
- Componente de clase (state, filtrado)
- Renderiza tarjetas Cargaimg en grid
- Buscador integrado
- Datos desde `inicial.json`

### 4. **ModalLogin.jsx**
- Modal overlay con fade-in animation
- Detección de contraste (luminancia)
- Fallback automático a fondo oscuro
- Props: `isOpen`, `onClose`, `children`

### 5. **ThemeContext.js**
- Estado global: background, text, modalBg
- localStorage persistence
- `handleResetTheme()` para settings
- Valores por defecto: tema oscuro (#1a1a1a)

---

## 🎯 Cambios Realizados en Esta Sesión

### **Problema Principal:**
Espacio negro grande al fondo de la galería + layout inadecuado

### **Soluciones Implementadas:**

#### 1. **Galería - De Flexbox a CSS Grid**
```css
.principal {
  display: grid;
  grid-template-columns: repeat(auto-fill, 249px);
  justify-content: center;
  column-gap: 10px;
  row-gap: 10px;
  padding: 20px 0 80px 0;
  min-height: 85vh;
  background-color: rgb(12, 12, 12);
  align-content: start;
}
```

**Ventajas:**
- ✅ Columnas responsivas automáticas
- ✅ Galería centrada perfectamente
- ✅ Espaciado consistente (10px)
- ✅ Llena 85% de viewport (no 100% para dejar aire)

#### 2. **Estructura HTML Mejorada**
```javascript
<div>
  <div className='head'>
    <Buscador />
  </div>
  <div className='body'>
    <div className='principal'>
      {tasks.map(task => <Cargaimg task={task} />)}
    </div>
  </div>
</div>
```

#### 3. **CSS Grid vs Flexbox**
| Propiedad | Flexbox | Grid |
|-----------|---------|------|
| Dirección | Primarily 1D | 2D |
| Auto-columnas | No | ✅ `auto-fill` |
| Centrado perfecto | Parcial | ✅ Total |
| Responsividad | Requiere media queries | ✅ Automática |

---

## 📊 Dimensiones y Espaciado

### Tarjetas (Cargaimg)
- Ancho: 249px (fijo)
- Alto: 239px (fijo)
- Contenido: Grid 2x2 de imágenes
- Borde: 2px solid rgb(247, 247, 251)

### Galería Container (.principal)
- Min-height: 85vh (85% viewport)
- Width: auto (fit-content con max-width 100%)
- Column-gap: 10px (entre tarjetas horizontalmente)
- Row-gap: 10px (entre filas)
- Padding: 20px 0 80px 0 (arriba, abajo para footer)

### Pantalla
- Footer fijo: 30px altura en bottom
- Navbar: ~70px altura
- Galería responsiva: Se adapta a cualquier ancho

---

## 🔐 Autenticación

### Modal Unificado (ModalLogin)
- Un solo modal para Sign In y Sign Up
- Estado: `authMode` en Navbar
- Botones para alternar entre modos
- Cierra modal después de login/signup exitoso

### SignInContent & SignUpContent
- Mismo estilo (ThemeContext)
- Validaciones básicas
- Props: `onLogin`/`onSignUp`, `onSwitchTo...`
- Uso de localStorage para persistencia

---

## 🎨 Sistema de Temas

### ThemeContext Valores Por Defecto
```javascript
{
  background: '#0c0c0c',
  text: '#ffffff',
  modalBg: '#1a1a1a',  // Oscuro para evitar white-on-white
  accent: '#0050ff'
}
```

### Detección de Contraste
```javascript
const luminancia = (0.299*R + 0.587*G + 0.114*B) / 255;
return luminancia > 0.5 ? '#000000' : '#ffffff';
```

---

## 📈 Flujo de Datos

```
App.js (ThemeProvider)
├── Navbar (user state, authMode)
│   └── ModalLogin (modal toggle)
│       ├── SignInContent (email, password)
│       └── SignUpContent (name, email, password, confirm)
│
├── ThemeContext (global theme)
│   └── useContext en todos los componentes
│
└── Routes
    ├── "/" → Principal (galería con grid)
    │   ├── Buscador (filtrado local)
    │   └── Cargaimg[] (tarjetas 249x239)
    ├── "/De/:nombre" → De (detalle)
    └── ... (otras páginas)
```

---

## 🐛 Bugs Solucionados

1. ✅ **Modal fondo blanco**
   - Causa: modalBg default = '#ffffff'
   - Solución: Cambiar a '#1a1a1a' + luminancia fallback

2. ✅ **Hamburger menu no aparece**
   - Causa: Posicionamiento con `top: -300px`
   - Solución: Cambiar a `display: flex/none`

3. ✅ **Espacio negro excesivo en galería**
   - Causa: `height: auto` + padding conflictivo
   - Solución: `min-height: 85vh` con CSS Grid

4. ✅ **Conflicto padding CSS**
   - Causa: `padding-bottom: 80px` sobrescrito por `padding: 20px 0`
   - Solución: Usar shorthand correcto `padding: 20px 0 80px 20px`

---

## 📋 Backups CSS Generados

```
Principal.css.backup    # Original con conflicto padding
Principal.css.backup2   # Con min-height: 100vh
Principal.css.backup3   # Con row-gap: 30px
Principal.css.backup4   # Con height: auto
Principal.css.backup5   # Con min-height: 100vh + centering flex
Principal.css.backup6   # Con justify-content: flex-start flex
Principal.css.backup7   # Versión actual con CSS Grid
```

---

## 🚀 Mejoras Futuras Sugeridas

### Court Term
- [ ] Agregar responsive design (media queries para mobile)
- [ ] Optimizar imágenes (lazy loading)
- [ ] Agregar animaciones al cambiar tema
- [ ] Validación de formularios mejorada

### Medium Term
- [ ] Backend API integration (reemplazar JSON)
- [ ] Sistema de favoritos/wishlist
- [ ] Filtros avanzados de búsqueda
- [ ] Carrito de compra
- [ ] Sistema de pagos

### Long Term
- [ ] Convertir Principal.js a componente funcional (Hooks)
- [ ] State management global (Redux/Context mejorado)
- [ ] Pruebas unitarias completas
- [ ] PWA (Progressive Web App)
- [ ] Multiidioma i18n

---

## 📝 Git & Versionado

**Último Commit:**
```
[main 255fa81] Mejorar galería Principal con CSS Grid centrado
- Cambiar de Flexbox a CSS Grid para layout más responsivo
- Usar grid-template-columns: repeat(auto-fill, 249px)
- Centrar galería con justify-content: center
```

**Rama:** main
**Remoto:** https://github.com/Drobles-code/Trastero.git

---

## 💾 Scripts Disponibles

```bash
npm start      # Inicia dev server (port 3000)
npm build      # Build para producción
npm test       # Ejecutar tests
npm eject      # Eject from CRA (no revertible)
```

---

## ✅ Estado Actual

- ✅ Galería funcional y responsive
- ✅ Autenticación modal unificada
- ✅ Tema global con persistencia
- ✅ Estructura componentes limpia
- ✅ CSS Grid optimizado
- ✅ Git sincronizado

**Siguiente paso recomendado:** Convertir Principal.js a funcional (Hooks) para consistencia con React 18.

---

*Documentación generada: 2026-03-30*
*Versión: 2.0.0 (en desarrollo)*

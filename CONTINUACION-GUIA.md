# 📦 Trastero - Guía de Continuación desde Casa

## 🔗 Ubicación del Proyecto

```
C:\Users\drobl\Desktop\CLAUDE\proyectos\Trastero
```

## 📊 Estado del Git

**Repositorio inicializado:** ✅
**Primer commit:** `6dbbcef` - Modernización de Trastero: React 18, tema oscuro, autenticación modal y búsqueda

## 🚀 Para Continuar Desde Casa

### 1. Abre PowerShell en la carpeta del proyecto
```powershell
cd C:\Users\drobl\Desktop\CLAUDE\proyectos\Trastero
```

### 2. Verifica el estado del git
```powershell
git status
git log --oneline
```

### 3. Para descargar lo último (si hay cambios)
```powershell
git pull
```

### 4. Instala dependencias (primera vez solamente)
```powershell
npm install
```

### 5. Inicia el servidor de desarrollo
```powershell
npm start
```

El proyecto abrirá en `http://localhost:3000`

---

## 📝 Resumen de Cambios Realizados

### ✅ Completado en esta sesión:

1. **Actualización a React 18.2.0**
   - Migración de React 17 → React 18
   - React Router DOM v6

2. **Sistema de Tema Personalizable**
   - Tema oscuro (negro #0a0a0a)
   - Colores personalizables: acento, texto, fondo, modal
   - Almacenamiento en localStorage
   - Página Settings para cambiar colores

3. **Autenticación Modal**
   - Modal popup para Iniciar Sesión
   - Modal popup para Registrarse
   - Persistencia de usuario en localStorage

4. **Buscador Funcional**
   - Principal.js: Busca en JSON local de trasteros
   - De.js: Busca en API Pixabay en tiempo real

5. **Galería Centrada y Responsiva**
   - Grid layout con `repeat(auto-fit, minmax(245px, 1fr))`
   - Imágenes distribuidas uniformemente
   - Responsiva en móvil (200px mín)

6. **Navbar Reorganizado**
   - Logo (📦 Trastero) a la IZQUIERDA
   - Menú (Inicio, Acerca de, Contacto, Tema) a la DERECHA
   - Buttons de Iniciar Sesión y Registrarse a la derecha

7. **Componentes Reutilizables**
   - ContactContent.jsx: Form de contacto reutilizable (modal + página)
   - AboutContent.jsx: Contenido "Acerca de" reutilizable

8. **Rutas Dinámicas**
   - `/De/:nombre` - Carga imágenes de un trastero específico
   - `/De/cafe` ejemplo: carga imágenes de "cafe"

---

## 🗂️ Estructura de Archivos Clave

```
src/
├── App.js                          # Rutas principales
├── context/
│   └── ThemeContext.js            # Sistema de tema global
├── pages/
│   ├── SignIn.jsx                 # Página de inicio de sesión
│   ├── SignUp.jsx                 # Página de registro
│   ├── Profile.jsx                # Perfil del usuario
│   ├── Settings.jsx               # Configuración de tema
│   ├── Contact.jsx                # Página de contacto
│   ├── About.jsx                  # Página acerca de
│   └── NotFound.jsx               # Página 404
├── components/
│   ├── Auth/
│   │   └── SignInContent.jsx      # Form de login (modal + página)
│   ├── Content/
│   │   ├── ContactContent.jsx     # Form de contacto reutilizable
│   │   └── AboutContent.jsx       # Contenido acerca de reutilizable
│   ├── Modal/
│   │   └── ModalLogin.jsx         # Modal genérico
│   ├── Formularios/
│   │   ├── Header/
│   │   │   └── Navbar.jsx         # Navbar con logo izq, menú der
│   │   ├── Principal/
│   │   │   ├── Principal.js       # Galería principal con buscador
│   │   │   └── Principal.css      # Estilos galería
│   │   ├── De/
│   │   │   ├── De.js              # Página de trastero (ruta dinámica)
│   │   │   └── De.css
│   │   ├── Buscador/
│   │   │   ├── Buscador.js        # Componente buscador
│   │   │   └── Buscador.css       # Centrado, responsive
│   │   └── CargaImgUser/
│   │       └── CargaImgUser.js    # Card de imagen (sin float)
├── inicial.json                    # JSON con trasteros locales
└── index.js
```

---

## 🎨 Colores del Tema Actual

- **Fondo Principal:** rgb(12, 12, 12) - Negro oscuro
- **Acento:** #667eea - Azul púrpura
- **Texto:** #ffffff - Blanco
- **Fondo Modal:** #ffffff - Blanco (personalizable)
- **Navbar:** Fondo oscuro con borde de acento

---

## 🔄 Git Workflow

### Ver commits
```powershell
git log --oneline
git log --all --graph --decorate
```

### Hacer cambios y commitear
```powershell
# Ver qué cambió
git status

# Agregar cambios
git add .

# Crear commit
git commit -m "Descripción del cambio"

# Ver commits
git log --oneline -5
```

### Si necesitas revertir cambios
```powershell
# Ver qué pasó en el último commit
git show HEAD

# Si no has hecho push, puedes revertir
git reset --hard HEAD~1
```

---

## 📋 Próximos Pasos / Ideas

1. **Mejorar SignIn/SignUp**
   - Validación más robusta
   - Integración con backend real
   - Recuperación de contraseña

2. **Mejorar Búsqueda**
   - Filtros avanzados en De.js
   - Historial de búsquedas
   - Búsqueda por categoría

3. **Página de Detalles**
   - Más información del trastero
   - Comentarios y reviews
   - Galería expandida

4. **Responsiva Mejorada**
   - Pruebas en móvil real
   - Optimizar navbar en mobile
   - Optimizar modal en pantallas pequeñas

5. **Backend/API**
   - Conectar a backend real
   - Base de datos de trasteros
   - Autenticación con JWT

---

## 🔗 APIs Utilizadas

- **Pixabay API** - Para cargar imágenes dinámicas
  - URL: `https://pixabay.com/api/?key=<KEY>&q=<QUERY>&per_page=30`
  - Key actual: `1732750-d45b5378879d1e877cd1d35a6`
  - ⚠️ Nota: Esta key debe cambiar por una propia en producción

---

## ✨ Tech Stack Actual

- **React:** 18.2.0
- **React Router:** v6
- **Styled Components:** v6 (CSS-in-JS)
- **Context API:** Para manejo de tema global
- **localStorage:** Para persistencia de tema y usuario

---

## 🐛 Si Algo Falla

### El servidor no inicia
```powershell
# Borra node_modules y reinstala
rm -r node_modules
npm install
npm start
```

### Errores de módulos
```powershell
npm install
npm audit fix
```

### Limpiar caché de React
```powershell
# En Windows, elimina esto en el navegador (DevTools)
# Application → Local Storage → Borra todo
```

---

## 📞 Comandos Útiles

```powershell
# Ver puerto 3000
netstat -ano | findstr :3000

# Matar proceso en puerto 3000 (si está atascado)
taskkill /PID <PID> /F

# Ver rama actual de git
git branch

# Crear rama nueva
git checkout -b mi-rama

# Cambiar de rama
git checkout master

# Ver diferencias
git diff
```

---

## 🎯 Estado General del Proyecto

| Aspecto | Estado | Notas |
|---------|--------|-------|
| React 18 | ✅ | Actualizado y funcionando |
| Tema | ✅ | Sistema completo con localStorage |
| Autenticación | ✅ | Modal popup funcional |
| Búsqueda | ✅ | Principal + De con API |
| Galería | ✅ | Centrada y responsiva |
| Navbar | ✅ | Logo izq, menú der |
| Git | ✅ | Primer commit realizado |
| Deploy | ❌ | No configurado aún |
| Backend | ❌ | Solo JSON local |
| Base de datos | ❌ | No implementada |

---

## 📌 Recuerda

- El proyecto está en `C:\Users\drobl\Desktop\CLAUDE\proyectos\Trastero`
- Usa `git status` y `git log` frecuentemente
- Crea commits pequeños y descriptivos
- Prueba en móvil (F12 → Responsive Design)
- El primer commit está en `6dbbcef`

¡Bienvenido de vuelta a casa! 🏠 Continúa desde donde lo dejamos.

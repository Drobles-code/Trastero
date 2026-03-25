# RESPALDO: Implementación Modal Unificado Autenticación

## Fecha: 2026-03-24
## Objetivo: Cambiar de DOS MODALES a UN SOLO MODAL que alterna entre Iniciar Sesión y Registro

---

## ESTADO ACTUAL (ANTES DE CAMBIOS)

### Archivos Existentes:
1. `/src/components/Auth/SignInContent.jsx` ✓ EXISTE
   - Formulario de Iniciar Sesión
   - Recibe props: onLogin, onSwitchToSignUp
   - Usa ThemeContext para colores

2. `/src/components/Auth/SignUpContent.jsx` ✗ NO EXISTE (será creado)

3. `/src/components/Modal/ModalLogin.jsx` ✓ EXISTE
   - Modal reutilizable
   - Recibe: isOpen, onClose, children
   - Ya tiene fallback para modalBg claro

4. `/src/components/Formularios/Header/Navbar.jsx` ✓ EXISTE
   - Abre ModalLogin con SignInContent
   - Estados: showSignInModal, showAboutModal, showContactModal
   - Botón "Iniciar Sesión" abre el modal

5. `/src/pages/SignUp.jsx` ✓ EXISTE (página separada, será reemplazada por modal)

---

## CAMBIOS A REALIZAR

### 1. CREAR: SignUpContent.jsx
**Ubicación:** `/src/components/Auth/SignUpContent.jsx`
**Basado en:** SignInContent.jsx
**Props necesarias:**
- onSignUp: función para registrarse
- onSwitchToSignIn: función para volver a Iniciar Sesión
- Usar ThemeContext para colores

### 2. MODIFICAR: Navbar.jsx
**Cambios:**
- Agregar estado: `const [authMode, setAuthMode] = useState('signin');`
  - 'signin' = mostrar SignInContent
  - 'signup' = mostrar SignUpContent

- Pasar funciones a SignInContent:
  - `onSwitchToSignUp={() => setAuthMode('signup')}`

- Pasar funciones a SignUpContent:
  - `onSwitchToSignIn={() => setAuthMode('signin')}`

- Agregar botón en menú: "Registrarse" que abre el modal
  - `onClick={() => { setShowSignInModal(true); setAuthMode('signup'); }}`

### 3. ESTRUCTURA FINAL EN NAVBAR:
```jsx
<ModalLogin isOpen={showSignInModal} onClose={() => setShowSignInModal(false)}>
  {authMode === 'signin' ? (
    <SignInContent
      onLogin={handleSignInSuccess}
      onSwitchToSignUp={() => setAuthMode('signup')}
    />
  ) : (
    <SignUpContent
      onSignUp={handleSignUpSuccess}
      onSwitchToSignIn={() => setAuthMode('signin')}
    />
  )}
</ModalLogin>
```

---

## FLUJO DE USUARIO

```
1. Click en Menú ☰ → Aparece el menú
2. Click en "Iniciar Sesión" → Modal abierto, muestra SignInContent
3. Click en "¿No tienes cuenta? Regístrate" → Modal sigue abierto, muestra SignUpContent
4. Click en "¿Ya tienes cuenta? Inicia sesión" → Modal sigue abierto, vuelve a SignInContent
5. Click en ✕ → Modal se cierra
```

---

## ARCHIVOS A RESPALDAR ANTES DE CAMBIOS

1. ✓ SignInContent.jsx (será usado como base para SignUpContent)
2. ✓ Navbar.jsx (será modificado significativamente)
3. ✓ SignUp.jsx (página separada - puede convertirse en referencia)

---

## CHECKLIST DE IMPLEMENTACIÓN

- [ ] Crear SignUpContent.jsx basado en SignInContent.jsx
- [ ] Modificar Navbar.jsx para agregar estado authMode
- [ ] Actualizar funciones onSwitchToSignUp y onSwitchToSignIn
- [ ] Agregar botón "Registrarse" en el menú
- [ ] Probar flujo Iniciar Sesión → Registro → Iniciar Sesión
- [ ] Probar cierre del modal en ambos modos
- [ ] Verificar colores del modal con ThemeContext
- [ ] Probar en diferentes rutas (Principal, /De/nombre, etc.)

---

## PARA REVERTIR

Si algo sale mal, los cambios principales son:
1. Eliminar SignUpContent.jsx
2. Revertir Navbar.jsx a versión anterior
3. Si es necesario, restaurar desde git: `git checkout HEAD~1 src/components/Formularios/Header/Navbar.jsx`

---

## NOTAS

- El modal ModalLogin YA ESTÁ OPTIMIZADO con fallback de color
- ThemeContext YA TIENE modalBg correcto (#1a1a1a)
- No afecta Contacto (Contact) ni Acerca de (About)
- La página /signup puede mantenerse como fallback o ser eliminada

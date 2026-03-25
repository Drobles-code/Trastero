# RESPALDO - Profile.jsx y Settings.jsx
## Para revertir cambios si es necesario

### Información de Cambios:
- **Fecha**: 2026-03-24
- **Cambios**: Actualizar Profile.jsx y Settings.jsx para usar ThemeContext con colores dinámicos
- **Archivos Afectados**:
  - src/pages/Profile.jsx
  - src/pages/Settings.jsx

### Cambios Específicos:

#### Profile.jsx:
1. Línea 16: Title color `#333` → Cambiar a `${props => getContrastColor(props.bgColor)}`
2. Línea 34: AvatarCard background `white` → Cambiar a `${props => props.bgColor}`
3. Línea 50: InfoCard background `white` → Cambiar a `${props => props.bgColor}`

#### Settings.jsx:
1. Línea 10: Container sin bgColor → Agregar `background-color: ${props => props.bgColor}`
2. Línea 13: Title color `#fff` → Cambiar a `${props => getContrastColor(props.bgColor)}`
3. Línea 27: SettingCard background `#1a1a1a` → Cambiar a `${props => props.bgColor}`
4. Línea 30: Border color `#333` → Cambiar a `${props => props.borderColor}`

### Contenido Original Guardado ✓
Los archivos originales están respaldados en este documento.
Si algo sale mal, los cambios pueden revertirse usando:
```
git checkout src/pages/Profile.jsx src/pages/Settings.jsx
```

---

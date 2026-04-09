---
name: Worktree y componentes compartidos
description: Lecciones aprendidas sobre worktrees, flujo de cambios y separación de componentes en Trastero
type: feedback
---

## 1. Los cambios en el worktree NO se ven en la app del usuario hasta hacer merge a main

El usuario corre la app desde `C:\Users\drobl\Desktop\CLAUDE\proyectos\Trastero` (rama `main`).
Los cambios hechos en el worktree (`goofy-ramanujan`) son invisibles para él hasta que se haga commit + merge.

**Why:** El usuario reportó "sigue igual" varias veces porque los cambios estaban en el worktree pero no en main.

**How to apply:** Después de cualquier cambio en el worktree, hacer siempre:
```bash
# en el worktree
git add <archivos> && git commit -m "..."
# en main
cd C:\Users\drobl\Desktop\CLAUDE\proyectos\Trastero
git merge claude/<nombre-worktree>
```

---

## 2. Al separar un componente compartido, restaurar el comportamiento original de cada consumidor

En este proyecto, `AdaptiveGrid` era compartido entre `Cargaimg.js` (página pública) y `MiTrastero.jsx`.
Al modificar el componente para Mi Trastero (quitar bordes), la página pública perdió su formato.

**Why:** Ambas páginas usaban el mismo `IMG_BASE` — cambiar uno rompió el otro.

**How to apply:** Al separar un componente compartido:
1. Copiar la función como local en el consumidor que necesita cambios
2. Dejar el original intacto para el otro consumidor
3. Verificar AMBAS páginas después del cambio

---

## 3. Verificar en el preview requiere login para Mi Trastero

La página `/mi-trastero` requiere autenticación. El preview no puede mostrarla sin credenciales.
Solo se puede verificar visualmente con la sesión del usuario en su propio navegador.

**How to apply:** Para cambios en Mi Trastero, tomar screenshot de la página pública como prueba de compilación correcta, y avisar al usuario que verifique `/mi-trastero` en su browser con sesión activa.

---

## 4. IMG_BASE_CARD debe tener el mismo border que IMG_BASE (Cargaimg)

`MiTrastero.jsx` tiene su propio `AdaptiveGrid` con `IMG_BASE_CARD`. Si `IMG_BASE_CARD` no incluye `border: '2px solid rgb(247 247 251)'`, las imágenes del grid se pegan entre sí sin separación visual.

**Why:** El usuario señaló que el grid de Mi Trastero no se veía bien comparado con la página principal. La causa era que `IMG_BASE_CARD = { objectFit: 'cover' }` no tenía borde, mientras que `IMG_BASE` en Cargaimg.js sí lo tiene.

**How to apply:** Mantener siempre `IMG_BASE_CARD = { objectFit: 'cover', border: '2px solid rgb(247 247 251)' }` en MiTrastero. El borde crea la separación entre imágenes del grid (tanto horizontal como vertical) y es parte del diseño, no un artefacto.

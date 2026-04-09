---
name: feedback_flujo_cambios
description: Reglas de flujo al finalizar cambios — git, memoria y copia de MDs
type: feedback
---

Al final de cada sesión con cambios significativos, SIEMPRE preguntar al usuario antes de:
1. Hacer git commit + push
2. Actualizar archivos de memoria del proyecto

Esperar confirmación explícita antes de ejecutar.

**Why:** El usuario quiere controlar cuándo se guardan cambios y no que se hagan automáticamente sin aviso.

**How to apply:** Al terminar una tanda de cambios relevantes (nuevas pantallas, endpoints, tablas, rediseños), preguntar: "¿Actualizo proyecto y git?"

---

## Copia de MDs — OBLIGATORIO

Cada vez que se actualice o cree cualquier archivo `.md` en la memoria:
```
C:\Users\drobl\.claude\projects\C--Users-drobl-Desktop-CLAUDE-proyectos-Trastero\memory\
```
hay que copiar el archivo también a:
```
C:\Users\drobl\Desktop\CLAUDE\proyectos\MD\
```

**Why:** El usuario mantiene esa carpeta como backup sincronizado con el repositorio. Si solo se actualiza la memoria interna, el backup queda desactualizado.

**How to apply:** Después de escribir o editar cualquier MD de memoria, copiar el archivo a `C:\Users\drobl\Desktop\CLAUDE\proyectos\MD\` en la misma operación. No es opcional.

---

Nota: ESTADO_PROYECTO.md ya no existe — el contexto del proyecto se guarda en la memoria automática (`memory/project_*.md`).

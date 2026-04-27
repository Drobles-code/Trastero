# MEMORY INDEX

## ⚡ Protocolo de inicio de sesión
1. Leer SOLO `project_overview.md` al empezar
2. Cargar el resto **bajo demanda** según la tarea
3. NUNCA cargar todos los MD de golpe — desperdicia tokens

## Cuándo cargar cada MD

| MD | Cargar cuando... |
|---|---|
| `project_overview.md` | **Siempre primero** |
| `project_frontend.md` | Tarea toca src/, páginas, modales, estilos, temas, grids |
| `project_backend.md` | Tarea toca server/, rutas API, auth, multer, endpoints |
| `project_database.md` | Tarea toca BD, tablas, schema.sql, migraciones |

## Project
> Fuente de verdad: carpeta `MD/` del repositorio (`C:\Users\drobl\Desktop\CLAUDE\proyectos\Trastero\MD\`)
- [project_overview.md](C:\Users\drobl\Desktop\CLAUDE\proyectos\Trastero\MD\project_overview.md) — Stack, repo, estado y próximos pasos. Cargar siempre.
- [project_database.md](C:\Users\drobl\Desktop\CLAUDE\proyectos\Trastero\MD\project_database.md) — Tablas, relaciones, campos, migraciones. Cargar al tocar BD.
- [project_backend.md](C:\Users\drobl\Desktop\CLAUDE\proyectos\Trastero\MD\project_backend.md) — Endpoints API, helpers, auth, multer. Cargar al tocar server/.
- [project_frontend.md](C:\Users\drobl\Desktop\CLAUDE\proyectos\Trastero\MD\project_frontend.md) — Componentes, páginas, grids, modales, estilos. Cargar al tocar src/.

## Feedback
- [feedback_flujo_cambios.md](C:\Users\drobl\.claude\projects\C--Users-drobl-Desktop-CLAUDE-proyectos-Trastero\memory\feedback_flujo_cambios.md) — Preguntar antes de git commit/push o actualizar memoria.
- [feedback_worktree_y_componentes.md](C:\Users\drobl\.claude\projects\C--Users-drobl-Desktop-CLAUDE-proyectos-Trastero\memory\feedback_worktree_y_componentes.md) — Border obligatorio en imágenes; Mi Trastero requiere login.
- [feedback_bd_pgadmin.md](C:\Users\drobl\.claude\projects\C--Users-drobl-Desktop-CLAUDE-proyectos-Trastero\memory\feedback_bd_pgadmin.md) — pgAdmin: pegar SQL directamente, nunca la ruta del archivo.

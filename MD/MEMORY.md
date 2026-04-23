# MEMORY INDEX

## Regla de carga
Cargar SOLO los archivos relevantes para la tarea. No cargar todo de golpe.

## Project

| Archivo | Cuándo cargarlo |
|---|---|
| [project_overview.md](./project_overview.md) | **Siempre** — estado, estructura, próximos pasos |
| [project_database.md](./project_database.md) | Al tocar BD, schema.sql, migraciones, tablas |
| [project_backend.md](./project_backend.md) | Al tocar server/, rutas API, auth, multer |
| [project_frontend.md](./project_frontend.md) | Al tocar src/, páginas, modales, estilos, temas |

## Guía rápida por tarea

| Tarea | Leer |
|---|---|
| Imágenes / grids / cards | `project_frontend.md` → sección ImageGrid |
| Modales (subir/editar/login) | `project_frontend.md` → sección Modales |
| Tema / colores / Settings | `project_frontend.md` → sección ThemeContext |
| Login / registro / JWT | `project_backend.md` + `project_frontend.md` → Auth |
| Nuevas rutas API | `project_backend.md` |
| Cambios en tablas BD | `project_database.md` |
| Arrancar el proyecto | `project_overview.md` → sección iniciar |
| Añadir componente nuevo | `project_frontend.md` → Patrones de estilo |

## Feedback
- [feedback_flujo_cambios.md](./feedback_flujo_cambios.md) — Preguntar siempre antes de hacer git commit/push o actualizar memoria.
- [feedback_worktree_y_componentes.md](./feedback_worktree_y_componentes.md) — Worktree invisible hasta merge; border en imágenes obligatorio; Mi Trastero requiere login.
- [feedback_bd_pgadmin.md](./feedback_bd_pgadmin.md) — pgAdmin: pegar SQL directamente, nunca escribir la ruta del archivo.

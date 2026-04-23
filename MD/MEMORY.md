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

## Guía rápida por tarea

| Tarea | Leer además |
|---|---|
| Imágenes / grids / cards | frontend → sección ImageGrid |
| Modales / formularios | frontend → sección Modales |
| Tema / colores / Settings | frontend → sección ThemeContext |
| Login / JWT / registro | backend + frontend → Auth |
| Nuevas rutas API | backend |
| Cambios en tablas | database |
| Arrancar el proyecto | overview → sección iniciar |

## Feedback
- [feedback_flujo_cambios.md](./feedback_flujo_cambios.md) — Preguntar antes de git commit/push o actualizar memoria
- [feedback_worktree_y_componentes.md](./feedback_worktree_y_componentes.md) — Border obligatorio en imágenes; Mi Trastero requiere login
- [feedback_bd_pgadmin.md](./feedback_bd_pgadmin.md) — pgAdmin: pegar SQL directamente, nunca la ruta del archivo

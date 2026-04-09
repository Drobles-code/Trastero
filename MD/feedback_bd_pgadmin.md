---
name: feedback_bd_pgadmin
description: Cómo aplicar schema SQL en pgAdmin — pegar SQL directamente, nunca escribir la ruta del archivo
type: feedback
---

En pgAdmin Query Tool NO se puede escribir la ruta de un archivo SQL (ej. `database/schema.sql`). Da error de sintaxis.

**Why:** El usuario intentó escribir `database/schema.sql` en el Query Tool y obtuvo `ERROR: error de sintaxis en o cerca de «database»`. pgAdmin no lee ficheros del disco desde el Query Tool.

**How to apply:** Siempre indicar al usuario:
1. Abrir el archivo en VS Code → **Ctrl+A → Ctrl+C**
2. Pegar en pgAdmin Query Tool → **F5**

Para el DROP inicial (borrar tablas viejas), dar el SQL directamente en el chat para que lo pegue sin tener que abrir ningún fichero:
```sql
DROP TABLE IF EXISTS imagenes CASCADE;
DROP TABLE IF EXISTS trastero_categorias CASCADE;
DROP TABLE IF EXISTS imagenes_detalle CASCADE;
DROP TABLE IF EXISTS trasteros CASCADE;
```

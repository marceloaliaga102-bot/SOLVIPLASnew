# Guía Completa de Despliegue: GitHub, Vercel y Supabase

Esta guía te explica paso a paso cómo subir este proyecto a **GitHub**, desplegarlo en **Vercel** y conectar la base de datos **Supabase**.

---

## 1. Subir el proyecto a GitHub

El repositorio local ya está inicializado con Git en la rama `main`. Para vincularlo a tu cuenta de GitHub:

1. Ve a [GitHub](https://github.com/new) y crea un nuevo repositorio (por ejemplo: `solviplas-bioplasticos`). Déjalo vacío (sin README ni .gitignore inicial).
2. En tu terminal o consola, ejecuta los siguientes comandos:

```bash
# 1. Agregar todos los archivos
git add .

# 2. Crear el commit inicial
git commit -m "feat: Lanzamiento de Solviplas con navegación fluida y soporte Supabase"

# 3. Vincular tu repositorio de GitHub (reemplaza con tu URL de GitHub)
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# 4. Subir a GitHub
git branch -M main
git push -u origin main
```

---

## 2. Desplegar en Vercel (1 Clic)

El archivo `vercel.json` ya está configurado en el proyecto para compilar Vite SPA y manejar el enrutamiento correctamente.

### Opción A: Desde el panel de Vercel (Recomendada)
1. Inicia sesión en [Vercel](https://vercel.com).
2. Haz clic en **"Add New..."** -> **"Project"**.
3. Selecciona tu repositorio de GitHub recién subido (`solviplas-bioplasticos`) y haz clic en **"Import"**.
4. Configuración del proyecto en Vercel:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. En la sección **Environment Variables**, agrega las variables de Supabase si ya las creaste (ver paso 3):
   - `VITE_SUPABASE_URL`: Tu URL del proyecto de Supabase
   - `VITE_SUPABASE_ANON_KEY`: Tu clave pública anon de Supabase
6. Haz clic en **"Deploy"**. En menos de 1 minuto tu aplicación estará activa con URL pública HTTPS.

---

## 3. Configurar la Base de Datos en Supabase

### Paso 1: Crear el proyecto en Supabase
1. Ingresa a [Supabase Dashboard](https://supabase.com/dashboard) y crea una cuenta o inicia sesión.
2. Haz clic en **"New Project"**, dale un nombre (ej. `solviplas-db`) y define una contraseña segura para la base de datos.
3. Elige la región más cercana a tus usuarios.

### Paso 2: Crear las tablas de la base de datos
1. En el menú lateral izquierdo de Supabase, ve a **SQL Editor**.
2. Haz clic en **"New query"**.
3. Abre el archivo `supabase-schema.sql` de este proyecto, copia todo su contenido y pégalo en el editor de Supabase.
4. Haz clic en **"Run"** (o presiona `Ctrl + Enter`). Esto creará automáticamente:
   - Tablas: `site_config`, `profiles`, `products`, `news_articles`, `forum_comments`, `team_members`.
   - Políticas de seguridad (Row Level Security - RLS) para lectura pública y protección de datos.

### Paso 3: Obtener tus Credenciales y Conectar
1. En Supabase, ve a **Project Settings** (icono de engranaje) -> **API**.
2. Copia:
   - **Project URL** (ej. `https://xyzcompany.supabase.co`)
   - **anon / public key** (ej. `eyJhbGciOi...`)
3. En tu archivo `.env` local y en las variables de entorno de Vercel, agrégalas:
   ```env
   VITE_SUPABASE_URL="https://tu-proyecto.supabase.co"
   VITE_SUPABASE_ANON_KEY="tu-clave-anonima-publica"
   ```
4. El cliente de Supabase ya está listo en `src/lib/supabase.ts` para interactuar con tus datos en tiempo real.

---

## Resumen de Archivos Agregados
- `vercel.json`: Configuración de compilación y rutas para Vercel.
- `supabase-schema.sql`: Script SQL con todas las tablas y políticas de seguridad para Supabase.
- `src/lib/supabase.ts`: Cliente TypeScript de Supabase con detector de conexión y autenticación.
- `.env.example`: Documentación de variables requeridas.

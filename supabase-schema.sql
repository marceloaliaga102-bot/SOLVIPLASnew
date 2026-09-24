-- ====================================================================
-- ESQUEMA COMPLETO DE BASE DE DATOS PARA SOLVIPLAS EN SUPABASE
-- Ejecuta este script en: Supabase Dashboard -> SQL Editor -> New Query
-- ====================================================================

-- 1. Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLA DE CONFIGURACIÓN DEL SITIO
CREATE TABLE IF NOT EXISTS public.site_config (
  id TEXT PRIMARY KEY DEFAULT 'current',
  site_name TEXT NOT NULL DEFAULT 'Solviplas',
  logo_badge TEXT DEFAULT 'Bioplásticos',
  logo_subtitle TEXT DEFAULT 'Química Verde & Hidrosolubilidad',
  logo_url TEXT,
  logo_icon TEXT DEFAULT 'Leaf',
  banner_headline TEXT,
  banner_subheadline TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABLA DE PERFILES DE USUARIO
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  eco_title TEXT DEFAULT 'Defensor del Planeta',
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABLA DE PRODUCTOS BIOPLÁSTICOS
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  tag TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  water_temp TEXT,
  dissolution_time TEXT,
  thickness TEXT,
  eco_impact TEXT,
  category TEXT DEFAULT 'Láminas',
  badge TEXT,
  downloads INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TABLA DE NOTICIAS Y ARTÍCULOS
CREATE TABLE IF NOT EXISTS public.news_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT NOT NULL,
  author TEXT NOT NULL,
  author_role TEXT,
  category TEXT NOT NULL,
  read_time TEXT DEFAULT '3 min',
  is_featured BOOLEAN DEFAULT false,
  date DATE DEFAULT CURRENT_DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. TABLA DE COMENTARIOS Y FORO COMUNITARIO
CREATE TABLE IF NOT EXISTS public.forum_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  author_role TEXT DEFAULT 'Miembro de la Comunidad',
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- 7. TABLA DE MIEMBROS DEL EQUIPO
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  avatar TEXT NOT NULL,
  bio TEXT NOT NULL,
  order_index INTEGER DEFAULT 0
);

-- ====================================================================
-- POLÍTICAS DE SEGURIDAD (ROW LEVEL SECURITY - RLS)
-- Permite lectura pública de catálogo y escritura para usuarios
-- ====================================================================

ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública (cualquier visitante puede ver el contenido)
CREATE POLICY "Lectura pública de site_config" ON public.site_config FOR SELECT USING (true);
CREATE POLICY "Lectura pública de productos" ON public.products FOR SELECT USING (true);
CREATE POLICY "Lectura pública de noticias" ON public.news_articles FOR SELECT USING (true);
CREATE POLICY "Lectura pública de foro" ON public.forum_comments FOR SELECT USING (true);
CREATE POLICY "Lectura pública de equipo" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Lectura pública de perfiles" ON public.profiles FOR SELECT USING (true);

-- Políticas de inserción en el foro (usuarios pueden comentar)
CREATE POLICY "Cualquiera puede publicar comentarios" ON public.forum_comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Usuarios pueden actualizar sus perfiles" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Datos iniciales de ejemplo
INSERT INTO public.site_config (id, site_name, logo_badge, logo_subtitle)
VALUES ('current', 'Solviplas', 'Bioplásticos', 'Química Verde & Hidrosolubilidad')
ON CONFLICT (id) DO NOTHING;

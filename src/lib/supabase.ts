import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Clean and normalize the Supabase Project URL
const rawUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://qlvwsmmeccupyegruegr.supabase.co';

export const SUPABASE_URL = rawUrl
  .replace(/\/rest\/v1\/?$/, '')
  .replace(/\/+$/, '');

export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_BIVxlPpKtCJCIbcDM3rlOA_kWjrQWJU';

// Safely initialize Supabase client
export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

export const isSupabaseConfigured = (): boolean => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
};

/**
 * Helper to test the connection to Supabase
 */
export async function checkSupabaseConnection(): Promise<{
  connected: boolean;
  message: string;
}> {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('site_name')
      .limit(1);

    if (error) {
      return {
        connected: false,
        message: `Error de Supabase: ${error.message}`,
      };
    }

    return {
      connected: true,
      message: `Conexión a Supabase exitosa (Sitio: ${data?.[0]?.site_name || 'Solviplas'})`,
    };
  } catch (err: any) {
    return {
      connected: false,
      message: err?.message || 'Error al conectar con Supabase',
    };
  }
}

/**
 * Service helpers for Supabase operations
 */
export const SupabaseService = {
  // Fetch Site Configuration
  async getSiteConfig() {
    const { data, error } = await supabase
      .from('site_config')
      .select('*')
      .eq('id', 'current')
      .single();
    if (error) throw error;
    return data;
  },

  // Update Site Configuration
  async updateSiteConfig(config: Record<string, any>) {
    const { data, error } = await supabase
      .from('site_config')
      .upsert({ id: 'current', ...config, updated_at: new Date().toISOString() })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Fetch Forum Comments
  async getComments() {
    const { data, error } = await supabase
      .from('forum_comments')
      .select('*')
      .order('date', { ascending: false });
    if (error) throw error;
    return data;
  },

  // Add a new comment
  async addComment(comment: {
    author_name: string;
    author_avatar?: string;
    author_role?: string;
    content: string;
  }) {
    const { data, error } = await supabase
      .from('forum_comments')
      .insert([comment])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Fetch Products
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  // Fetch News
  async getNews() {
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .order('date', { ascending: false });
    if (error) throw error;
    return data;
  },
};

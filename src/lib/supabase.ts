import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Safely initialize Supabase client if credentials are provided
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      })
    : null;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabase);
};

/**
 * Helper to test the connection to Supabase
 */
export async function checkSupabaseConnection(): Promise<{
  connected: boolean;
  message: string;
}> {
  if (!supabase) {
    return {
      connected: false,
      message: 'Supabase no está configurado. Agrega VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY a tu archivo .env',
    };
  }

  try {
    const { error } = await supabase.from('_test_health').select('*').limit(1);
    // Even if the test table doesn't exist (PGRST116/42P01), it means the connection to Supabase endpoint succeeded!
    if (error && error.code !== '42P01' && error.code !== 'PGRST116') {
      return {
        connected: false,
        message: `Error de Supabase: ${error.message}`,
      };
    }
    return {
      connected: true,
      message: 'Conexión a Supabase exitosa',
    };
  } catch (err: any) {
    return {
      connected: false,
      message: err?.message || 'Error al conectar con Supabase',
    };
  }
}

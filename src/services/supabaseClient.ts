import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('placeholder')
  );
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Sign in existing user with email and password
 */
export async function signInWithSupabase(email: string, password: string) {
  if (!supabase) {
    throw new Error('Supabase is not configured yet. Please add your credentials in .env.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

/**
 * Sign up a new user with email, password, and custom metadata
 */
export async function signUpWithSupabase(
  email: string,
  password: string,
  metadata: { name: string; role: string; eventCode?: string }
) {
  if (!supabase) {
    throw new Error('Supabase is not configured yet. Please add your credentials in .env.');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: metadata.name,
        role: metadata.role,
        event_code: metadata.eventCode || 'WED-2024-JUL',
      },
    },
  });

  if (error) throw error;
  return data;
}

/**
 * Sign out current session
 */
export async function signOutFromSupabase() {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Supabase sign-out error:', error);
}

/**
 * Get current session user
 */
export async function getSupabaseUser() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user || null;
}

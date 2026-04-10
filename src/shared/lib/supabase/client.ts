import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './env';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

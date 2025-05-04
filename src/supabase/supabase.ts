import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL_LOCAL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY_LOCAL;

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
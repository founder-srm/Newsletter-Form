import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
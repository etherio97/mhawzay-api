import { SUPABASE_SECRET, SUPABASE_URL } from "@mhawzay/config";
import { SupabaseClient } from "@supabase/supabase-js";

export let supabase: SupabaseClient;

export function initializeSupabase() {
  supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_SECRET);
  return supabase;
}

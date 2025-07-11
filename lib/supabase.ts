import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ueoikmkfsesufexedtjd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlb2lrbWtmc2VzdWZleGVkdGpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMzUyNzEsImV4cCI6MjA2NzgxMTI3MX0.4lr3lTsdOZPrRfCsKEl-C_jDvL_MI3sc0SHR-zzToMc"; // dein echter anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

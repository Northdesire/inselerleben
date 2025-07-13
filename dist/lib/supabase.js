"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
var supabase_js_1 = require("@supabase/supabase-js");
var supabaseUrl = "https://ueoikmkfsesufexedtjd.supabase.co";
var supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlb2lrbWtmc2VzdWZleGVkdGpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMzUyNzEsImV4cCI6MjA2NzgxMTI3MX0.4lr3lTsdOZPrRfCsKEl-C_jDvL_MI3sc0SHR-zzToMc"; // dein echter anon key
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey);

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ueoikmkfsesufexedtjd.supabase.co", // hier ersetzen
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlb2lrbWtmc2VzdWZleGVkdGpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMzUyNzEsImV4cCI6MjA2NzgxMTI3MX0.4lr3lTsdOZPrRfCsKEl-C_jDvL_MI3sc0SHR-zzToMc" // hier deinen echten anon-key einsetzen
);

async function testConnection() {
  const { data, error } = await supabase.from("events").select("*").limit(1);
  if (error) {
    console.error("Fehler beim Zugriff:", error);
  } else {
    console.log("Verbindung erfolgreich. Beispiel-Daten:", data);
  }
}

testConnection();

import { supabase } from "../../../../lib/supabase";
import { NextResponse } from "next/server";

// Beispiel: Holt Events aus externer API oder Datei
async function fetchTodaysEvents(): Promise<any[]> {
  const res = await fetch("https://deine-event-api.de/events-today.json");
  const data = await res.json();
  return data;
}

export async function GET() {
  const events = await fetchTodaysEvents();

  // Lösche alte Einträge für heute
  const today = new Date().toISOString().split("T")[0];
  await supabase.from("events_today").delete().eq("date", today);

  // Neue Events einfügen
  const { error } = await supabase.from("events_today").insert(events);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

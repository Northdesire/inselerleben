import { supabase } from "../../../../lib/supabase";
import { NextResponse } from "next/server";

// Beispiel: Holt Events aus externer API oder Datei
type EventData = {
    title: string;
    date: string;
    // ergänze ggf. weitere Felder wie "location", "id", etc.
  };
  
  async function fetchTodaysEvents(): Promise<EventData[]> {
  
  const res = await fetch("https://deine-event-api.de/events-today.json");
  const data = await res.json();
  return data;
}

export async function GET(): Promise<Response> {
  const events = await fetchTodaysEvents();

  const today = new Date().toISOString().split("T")[0];
  await supabase.from("events_today").delete().eq("date", today);

  const { error } = await supabase.from("events_today").insert(events);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

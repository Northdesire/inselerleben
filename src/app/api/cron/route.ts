import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";
import events from "../../../../events-today.json";

export async function GET(): Promise<Response> {
  // Sicherheit prüfen (optional)
  if (
    process.env.CRON_SECRET &&
    process.env.CRON_SECRET !== process.env.VERCEL_CRON_SECRET
  ) {
    return new Response("Unauthorized", { status: 401 });
  }

  // ⏱ Zeit bereinigen (z. B. "11. Juli 2025 um 08:30" → "08:30:00")
  const cleanedEvents = events.map((event) => {
    const match = event.time?.match(/(\d{2}):(\d{2})/); // z. B. 08:30
    const formattedTime = match ? `${match[1]}:${match[2]}:00` : null;

    return {
      ...event,
      time: formattedTime,
    };
  });

  // ❌ Vorherige Events löschen
  await supabase.from("events").delete().neq("id", 0);

  // ✅ Neue Events einfügen
  const { error } = await supabase.from("events").insert(cleanedEvents);

  if (error) {
    console.error("Supabase-Fehler:", error);
    return new Response(`Fehler beim Hochladen: ${error.message}`, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

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

  await supabase.from("events").delete().neq("id", 0);
  const { error } = await supabase.from("events").insert(events);

  if (error) {
    return new Response("Fehler beim Hochladen", { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

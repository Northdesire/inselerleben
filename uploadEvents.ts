import { createClient } from "@supabase/supabase-js";
import events from "./events-today.json";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Wichtig: kein Public Key!
);

async function upload() {
  const cleanedEvents = events.map((event) => {
    const match = event.time?.match(/(\d{2}):(\d{2})/);
    const formattedTime = match ? `${match[1]}:${match[2]}:00` : null;

    return {
      ...event,
      time: formattedTime,
    };
  });

  await supabase.from("events").delete().neq("id", 0);
  const { error } = await supabase.from("events").insert(cleanedEvents);

  if (error) {
    console.error("❌ Fehler beim Hochladen:", error.message);
  } else {
    console.log("✅ Events erfolgreich hochgeladen.");
  }
}

upload();

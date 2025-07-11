import "dotenv/config";
import { supabase } from "../lib/supabase";
import events from "../events-today.json";

async function uploadEvents() {
  // 🧹 Optional: alte Events löschen
  await supabase.from("events").delete().neq("id", 0);

  // 🛠 Zeit formatieren für jeden Event
  const cleanedEvents = events.map((event) => {
    const rawTime = event.time || "";
    let formattedTime: string | null = null;

    const match = rawTime.match(/(\d{2}:\d{2})/); // z. B. "08:30"
    if (match) {
      formattedTime = `${match[1]}:00`; // → "08:30:00"
    }

    return {
      ...event,
      time: formattedTime,
    };
  });

  // 📤 Events hochladen
  const { error } = await supabase.from("events").insert(cleanedEvents);

  if (error) {
    console.error("❌ Fehler beim Hochladen:", error);
  } else {
    console.log("✅ Events erfolgreich hochgeladen!");
  }
}

uploadEvents();

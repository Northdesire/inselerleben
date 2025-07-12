"use client";

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { supabase } from "../../../../lib/supabase"; // ggf. Pfad anpassen!

type Event = {
  title: string;
  time: string;
  location: string;
  description: string;
  url: string;
  date: string;
};

export default function EventsCard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function loadEvents() {
      const today = new Date().toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("date", today)
        .order("time", { ascending: true });

      if (error) {
        console.error("Fehler beim Laden der Events von Supabase:", error);
      }

      if (data && data.length > 0) {
        setEvents(data);
      } else {
        try {
          const res = await fetch("/events_today.json"); // aus dem Root lesen
          const fallback = await res.json();
          const filtered = fallback.filter((ev: Event) => ev.date === today);
          setEvents(filtered);
        } catch (err) {
          console.error("Fallback-Events konnten nicht geladen werden:", err);
        }
      }
    }

    loadEvents();
  }, []);

  const visibleEvents = showAll ? events : events.slice(0, 2);

  return (
    <Card
      icon={<CalendarDays className="text-green-600 w-8 h-8" />}
      title="Events heute"
      className="sm:col-span-2"
    >
      {visibleEvents.length === 0 ? (
        <p className="text-gray-500">Keine Veranstaltungen für heute gefunden.</p>
      ) : (
        <ul className="space-y-3">
          {visibleEvents.map((ev, i) => (
            <li key={i}>
              <span className="font-semibold mr-1">{ev.time?.slice(0, 5)}</span>
              <span className="mr-1">·</span>
              <a
                href={ev.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {ev.title}
              </a>
              <br />
              <span className="text-xs text-gray-500">{ev.location}</span>
              <br />
              <span className="text-xs italic text-gray-500">{ev.description}</span>
            </li>
          ))}
        </ul>
      )}

      {events.length > 2 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 text-sm text-blue-600 hover:underline"
        >
          {showAll ? "Weniger anzeigen ↑" : "Weitere Veranstaltungen anzeigen ↓"}
        </button>
      )}
    </Card>
  );
}

function Card({
  icon,
  title,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-xl shadow-md p-5 flex items-start gap-4 ${className}`}>
      <div className="w-8 h-8 shrink-0">{icon}</div>
      <div>
        <h2 className="font-semibold text-blue-900">{title}</h2>
        <div className="text-sm text-gray-600">{children}</div>
      </div>
    </div>
  );
}


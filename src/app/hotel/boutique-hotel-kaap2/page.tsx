import {
  MapPin,
  Sun,
  Utensils,
  Info,
  CloudSun,
  CloudRain,
  CloudSnow,
  Cloud,
  FileText
} from "lucide-react";

import fs from "fs/promises";
import path from "path";
import EventsCard from "./EventsCard";

type WeatherData = {
  temperature: number;
  windspeed: number;
  weathercode: number;
};

type Event = {
  title: string;
  time: string;
  location: string;
  description: string;
  url: string;
  date: string;
};

function getWeatherIcon(code: number) {
  if ([0, 1].includes(code)) return <Sun className="text-yellow-400 w-8 h-8" />;
  if ([2, 3].includes(code)) return <CloudSun className="text-yellow-500 w-8 h-8" />;
  if ([45, 48].includes(code)) return <Cloud className="text-gray-400 w-8 h-8" />;
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return <CloudRain className="text-sky-400 w-8 h-8" />;
  if ([71, 73, 75, 85, 86].includes(code)) return <CloudSnow className="text-blue-200 w-8 h-8" />;
  return <Cloud className="text-gray-400 w-8 h-8" />;
}

export default async function HotelGuidePage() {
  const weatherRes = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=53.595&longitude=6.67&current_weather=true"
  );
  const weatherJson = await weatherRes.json();
  const weather: WeatherData = weatherJson.current_weather;

  const eventsFile = await fs.readFile(path.join(process.cwd(), "events-today.json"), "utf-8");
  const events: Event[] = JSON.parse(eventsFile);

  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      {/* Blurry Background Image */}
      <div
  className="absolute top-0 left-0 w-full h-full bg-cover bg-center blur-xl"
  style={{ backgroundImage: "url('/bg-dunes.jpg')" }}
  aria-hidden="true"
/>

      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" aria-hidden="true" />

      {/* Main content */}
      <div className="relative z-10 p-6 text-gray-800">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="overflow-hidden rounded-3xl shadow-xl border border-sky-100">
            <img
              src="/hotelbild-kaap2.jpg"
              alt="Hotel Kaap2"
              className="w-full h-72 object-cover"
            />
          </div>

          <div className="text-center space-y-3">
            <h1 className="text-4xl sm:text-5xl font-bold text-cyan-800">
              Willkommen im Boutique Hotel Kaap2
            </h1>
            <p className="text-lg text-sky-600">
              Alles, was Sie für Ihren Aufenthalt auf Borkum brauchen – auf einen Blick.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card icon={getWeatherIcon(weather.weathercode)} title="Wetter aktuell">
              {weather.temperature}°C · Wind: {weather.windspeed} km/h
            </Card>

            <Card icon={<Info className="text-blue-600 w-8 h-8" />} title="Infos zum Hotel" className="sm:col-span-2">
              Frühstück: 7:30–10:30 Uhr · WLAN: Nordstrand2025 · Spa: täglich 14–20 Uhr
            </Card>

            <EventsCard events={events} />

            <Card icon={<Utensils className="text-red-500 w-8 h-8" />} title="Essen & Trinken">
              <p className="mb-2">
                Unsere heutigen Empfehlungen: Fünf Restaurants mit abwechslungsreicher Küche,
                frischen Zutaten und liebevoller Atmosphäre – perfekt für jeden Geschmack.
              </p>
              <ul className="list-disc ml-6 space-y-2">
                {[
                  "Knurrhahn Fischschnellrestaurant",
                  "Restaurant Die Kleine Möwe",
                  "Restaurant Black Pearl",
                  "Restaurant Zum Störtebeker",
                  "Restaurant Klein & Fein",
                ].map((place) => (
                  <li key={place}>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place + " Borkum")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-cyan-800"
                    >
                      {place}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>

            <Card icon={<MapPin className="text-purple-600 w-8 h-8" />} title="Geheimtipp">
              Spaziergang zur Düne 7 bei Sonnenuntergang – unvergesslich!
            </Card>

            <Card icon={<FileText className="text-indigo-600 w-8 h-8" />} title="Gästemappe öffnen">
              <a
                href="/gaestemappe.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-cyan-700 hover:text-cyan-900"
              >
                PDF anzeigen
              </a>
            </Card>
          </div>

          <div className="text-center mt-10">
            <button className="bg-cyan-700 hover:bg-cyan-800 text-white text-lg px-8 py-3 rounded-full shadow-md transition duration-200">
              Wir freuen uns auf Ihre Google Bewertung!
            </button>
          </div>

          <div className="text-center text-sm text-gray-400 mt-10">
            © 2025 Boutique Hotel Kaap2 · Bereitgestellt von inselerleben.de
          </div>
        </div>
      </div>
    </div>
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
    <div className={`bg-white rounded-2xl shadow-sm border border-sky-100 p-5 flex items-start gap-4 ${className}`}>
      {icon}
      <div>
        <h2 className="font-semibold text-cyan-700 text-lg">{title}</h2>
        <div className="text-sm text-gray-700 mt-1">{children}</div>
      </div>
    </div>
  );
}


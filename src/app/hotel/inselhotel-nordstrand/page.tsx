import {
    CalendarDays,
    MapPin,
    Sun,
    Utensils,
    Info,
    CloudSun,
    CloudRain,
    CloudSnow,
    Cloud
  } from "lucide-react";
  
import fs from "fs/promises";
import path from "path";

import EventsCard from "./EventsCard";

// Wetter-Datentyp
type WeatherData = {
  temperature: number;
  windspeed: number;
  weathercode: number;
};

// Event-Datentyp
type Event = {
  title: string;
  time: string;
  location: string;
  description: string;
  url: string;
  date: string;
};

// Wettercode zu Icon-Komponente
function getWeatherIcon(code: number) {
  if ([0, 1].includes(code)) return <Sun className="text-yellow-400 w-8 h-8" />;
  if ([2, 3].includes(code)) return <CloudSun className="text-yellow-500 w-8 h-8" />;
  if ([45, 48].includes(code)) return <Cloud className="text-gray-400 w-8 h-8" />;
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return <CloudRain className="text-blue-400 w-8 h-8" />;
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
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-white p-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="overflow-hidden rounded-3xl shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1470&q=80"
            alt="Hotelansicht mit Strand"
            className="w-full h-72 object-cover"
          />
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-blue-800 drop-shadow-sm">
            Willkommen im Inselhotel Nordstrand
          </h1>
          <p className="text-lg text-blue-600 mt-3">
            Alles, was Sie für Ihren Aufenthalt auf Borkum brauchen – auf einen Blick.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card icon={getWeatherIcon(weather.weathercode)} title="Wetter aktuell">
            {weather.temperature}°C · Wind: {weather.windspeed} km/h
          </Card>

          <EventsCard events={events} />

          <Card icon={<Utensils className="text-red-500 w-8 h-8" />} title="Essen & Trinken">
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
                    className="hover:underline"
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

          <Card icon={<Info className="text-blue-600 w-8 h-8" />} title="Infos zum Hotel" className="sm:col-span-2">
            Frühstück: 7:30–10:30 Uhr · WLAN: Nordstrand2025 · Spa: täglich 14–20 Uhr
          </Card>
        </div>

        <div className="text-center mt-10">
          <button className="bg-blue-700 hover:bg-blue-800 text-white text-lg px-8 py-3 rounded-full shadow">
            Weitere Tipps entdecken
          </button>
        </div>

        <div className="text-center text-sm text-gray-400 mt-6">
          © 2025 Inselhotel Nordstrand · Bereitgestellt von Inselführer.de
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
    <div className={`bg-white rounded-xl shadow-md p-5 flex items-start gap-4 ${className}`}>
      {icon}
      <div>
        <h2 className="font-semibold text-blue-900">{title}</h2>
        <div className="text-sm text-gray-600">{children}</div>
      </div>
    </div>
  );
}

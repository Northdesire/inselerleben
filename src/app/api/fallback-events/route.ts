import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  try {
    const filePath = path.resolve(process.cwd(), "events_today.json");
    const file = await fs.readFile(filePath, "utf8");
    const events = JSON.parse(file);
    return NextResponse.json(events);
  } catch (error) {
    console.error("Fehler beim Lesen von events_today.json:", error);
    return new Response("Fehler beim Laden der Events", { status: 500 });
  }
}

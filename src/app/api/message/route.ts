import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const filePath = path.join(process.cwd(), "src/lib/message.txt");
  const message = fs.readFileSync(filePath, "utf-8");

  return NextResponse.json({ message });
}

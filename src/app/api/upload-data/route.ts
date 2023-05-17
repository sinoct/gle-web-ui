import { NextRequest, NextResponse } from "next/server";
import { writeFileSync } from "fs";

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("TXT UPLOAD");
  const tmp = await req.json();
  console.log("TMP", tmp, typeof tmp);
  try {
    console.log("writing file");
    const buffer = Buffer.from(tmp.file, "base64");
    writeFileSync("data.txt", buffer);
  } catch (error) {
    console.log("write error", error);
  }
  return new Response("hello");
}

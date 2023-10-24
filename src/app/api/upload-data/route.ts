import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, mkdirSync } from "fs";

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("TXT UPLOAD");
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get("file-name") || "data.txt";
  const tmp = await req.json();
  const filePath = `./generated/${tmp.label}`;
  try {
    mkdirSync(filePath, { recursive: true });
  } catch (error) {
    console.log(error);
  }
  try {
    console.log("writing file");
    const buffer = Buffer.from(tmp.file, "base64");
    writeFileSync(`${filePath}/${fileName}`, buffer);
  } catch (error) {
    console.log("write error", error);
  }
  return new Response("File Created");
}

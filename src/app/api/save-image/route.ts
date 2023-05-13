import { NextRequest, NextResponse } from "next/server";
import { writeFileSync } from "fs";

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("SAVING CODE");
  const tmp = await req.json();
  try {
    console.log("writing file");
    writeFileSync("sample.gle", tmp.text);
  } catch (error) {
    console.log("write error", error);
  }

  return new Response("CODE GENERATED!");
}

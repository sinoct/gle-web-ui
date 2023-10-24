import { NextRequest, NextResponse } from "next/server";
import { mkdirSync, writeFileSync } from "fs";

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("SAVING CODE");
  const tmp = await req.json();
  const filePath = `./generated/${tmp.label}`;
  try {
    mkdirSync(filePath, { recursive: true });
  } catch (error) {
    console.log(error);
  }
  try {
    console.log("writing file");
    writeFileSync(`${filePath}/code.gle`, tmp.text);
  } catch (error) {
    console.log("write error", error);
  }
  return new Response("CODE GENERATED!");
}

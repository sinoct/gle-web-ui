import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { toBase64 } from "@/utils/base64Handler";

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("IMAGE GENERATION");
  const data = readFileSync("sample.png", { encoding: "base64" });
  return new Response(data);
}

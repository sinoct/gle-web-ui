import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("IMAGE FETCH STARTED");
  const { searchParams } = new URL(req.url);
  const label = searchParams.get("label") || "test";
  const data = readFileSync(`./generated/${label}/code.png`, {
    encoding: "base64",
  });
  console.log("IMAGE FETCH FINISHED");
  return new Response(data);
}

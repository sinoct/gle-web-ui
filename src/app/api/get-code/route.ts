import { NextRequest } from "next/server";
import { readFileSync } from "fs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const label = searchParams.get("label") || "test";
  const data = readFileSync(`./generated/${label}/code.gle`);
  return new Response(data);
}

import { execSync } from "child_process";
import { mkdirSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest, res: NextResponse) {
  const tmp = await req.json();
  const wd = process.cwd();
  execSync("gle -d png code.gle", {
    cwd: path.join(wd, "generated", tmp.label),
  });
  return new Response("IMAGE GENERATED");
}

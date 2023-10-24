import { exec } from "child_process";
import { mkdirSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("IMAGE GENERATION");
  const tmp = await req.json();
  const filePath = `./generated/${tmp.label}`;
  const wd = process.cwd();
  exec(
    "gle -d png code.gle",
    { cwd: path.join(wd, "generated", tmp.label) },
    (error, stdout, stderr) => {
      if (error) {
        console.log(error);
      }
      if (stderr) {
        console.log(stderr);
      }
      if (stdout) {
        console.log(stdout);
      }
    }
  );
  console.log("IMAGE GENERATED");
  return new Response("IMAGE GENERATED");
}

import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("IMAGE GENERATION");
  exec("gle -d png sample.gle", (error, stdout, stderr) => {
    if (error) {
      console.log(error);
    }
    if (stderr) {
      console.log(stderr);
    }
  });
  return new Response("IMAGE GENERATED");
}

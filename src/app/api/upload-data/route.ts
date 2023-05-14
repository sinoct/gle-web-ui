import { NextRequest, NextResponse } from "next/server";
import { writeFileSync } from "fs";

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("TXT UPLOAD");
  const tmp = await req.json();
  console.log("TMP", tmp);
  const file = tmp.get("file");
  if (file instanceof File) {
    console.log(file.name);
  }
  const cucc = file?.valueOf();
  console.log(typeof file, file);
  console.log(cucc?.constructor());
  try {
    console.log("writing file");
    //writeFileSync("data.txt", file);
  } catch (error) {
    console.log("write error", error);
  }
  return new Response("hello");
}

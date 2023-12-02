import { readdirSync } from "fs";

export async function GET(request: Request) {
  const files = readdirSync("./generated");
  return new Response(JSON.stringify(files));
}

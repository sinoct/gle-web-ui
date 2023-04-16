import { exec } from "child_process";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("PICTURE GENERATION");
  exec("gle -d png sample.gle", (error, stdout, stderr) => {
    if (error) {
      console.log(error);
    }
    if (stderr) {
      console.log(stderr);
    }
    console.log("out:", stdout);
  });
  return new Response("Hello, Generator!");
}

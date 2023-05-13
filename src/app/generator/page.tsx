"use client";
import { PageSizeSetter } from "@/components/PageSizeSetter";
import { useState } from "react";
import { baseTemplate } from "../../../public/graphTemplate";
import { generateCode } from "@/utils/templateSetter";
import CursorMove from "@/components/CursorMove";
import Image from "next/image";

export default function Generator() {
  const [gleData, setGleData] = useState(baseTemplate);
  const [generatedImage, setGeneratedImage] = useState("");

  const callGeneration = async () => {
    try {
      const res = await fetch("/api/generate-image", {
        method: "GET",
      });
      let cucc = res;
      console.log(cucc);
    } catch (e) {
      console.log(e);
    }
  };

  const getImage = async () => {
    try {
      const res = await fetch("api/get-image", {
        method: "GET",
      });
      const cucc = await res.text();
      console.log(cucc);
      setGeneratedImage(`data:image/png;base64,${cucc}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <div className="p-4 text-3xl flex justify-center">GLE code generator</div>
      <div className="flex">
        <div className="flex flex-col gap-2 basis-1/2">
          <div>
            <PageSizeSetter template={gleData} templateSetter={setGleData} />
          </div>
          <div>
            <CursorMove template={gleData} templateSetter={setGleData} />
          </div>
        </div>
        <div className="flex basis-1/2">
          {generatedImage && (
            <Image
              src={generatedImage}
              alt="generated image"
              width={500}
              height={500}
            />
          )}
        </div>
      </div>

      <button
        className="bg-blue-700 hover:bg-blue-500 p-4 rounded"
        onClick={() => {
          generateCode(gleData);
          callGeneration();
          getImage();
        }}
      >
        Generate
      </button>
    </div>
  );
}

"use client";
import { PageSizeSetter } from "@/components/PageSizeSetter";
import { useState } from "react";
import { baseTemplate } from "../../../public/graphTemplate";
import { generateCode } from "@/utils/templateSetter";

export default function Generator() {
  const [gleData, setGleData] = useState(baseTemplate);

  const callGeneration = async () => {
    try {
      const res = await fetch("/api/generate-image", {
        method: "GET",
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full">
      <div className="p-4 text-3xl flex justify-center">GLE code generator</div>

      <div>
        <PageSizeSetter template={gleData} templateSetter={setGleData} />
      </div>

      <button
        className="bg-blue-700 hover:bg-blue-500 p-4 rounded"
        onClick={() => {
          generateCode(gleData);
          callGeneration();
        }}
      >
        Generate
      </button>
    </div>
  );
}

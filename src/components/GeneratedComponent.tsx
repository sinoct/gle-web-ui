import { FunctionComponent, useState } from "react";
import Image from "next/image";
import { downloadFile } from "@/utils/templateSetter";

interface GeneratedProps {
  generatedImage: string;
  generatedCode: string;
}

const GeneratedComponent: FunctionComponent<GeneratedProps> = ({
  generatedCode,
  generatedImage,
}) => {
  const [selectedView, setSelectedView] = useState("Code");
  return (
    <div className="flex flex-col w-full">
      <div
        className="flex justify-center cursor-pointer"
        onClick={() =>
          setSelectedView(`${selectedView === "Code" ? "Image" : "Code"}`)
        }
      >
        Swith to {`${selectedView === "Code" ? "Image" : "Code"}`} view
      </div>
      {selectedView === "Code" && (
        <>
          <div>
            <pre>
              <code>{generatedCode}</code>
            </pre>
          </div>
          <div className="flex justify-center w-full">
            <button
              className="bg-blue-700 hover:bg-blue-500 p-4 rounded"
              onClick={() => downloadFile(generatedCode)}
            >
              Download
            </button>
          </div>
        </>
      )}
      {selectedView === "Image" && (
        <div>
          <Image
            src={generatedImage}
            alt="generated image"
            width={500}
            height={500}
          />
        </div>
      )}
    </div>
  );
};

export default GeneratedComponent;

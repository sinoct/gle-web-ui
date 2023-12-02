import { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import { downloadFile } from "@/utils/templateHandler";

interface GeneratedProps {
  generatedImage: string;
  generatedCode: string;
  getImage: any;
  status: "idle" | "loading" | "finished";
  label: string;
}

const GeneratedComponent: FunctionComponent<GeneratedProps> = ({
  generatedCode,
  generatedImage,
  getImage,
  status,
  label,
}) => {
  const [selectedView, setSelectedView] = useState("Code");
  const [isEditing, setIsEditing] = useState(false);
  const [codeText, setCodeText] = useState(generatedCode);
  const [tmpText, setTmpText] = useState(codeText);

  const cancelEditing = () => {
    setIsEditing(false);
    setTmpText(codeText);
  };

  const saveEditing = async () => {
    try {
      await fetch("/api/save-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: tmpText,
          label,
        }),
      });
      setCodeText(tmpText);
      setIsEditing(false);
      try {
        await fetch("/api/generate-image", {
          method: "POST",
          body: JSON.stringify({
            label,
          }),
        });
      } catch (e) {
        console.log(e);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const codeChangeHandler = (event: any) => {
    setTmpText(event.currentTarget.textContent);
  };

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
              <code contentEditable={isEditing} onInput={codeChangeHandler}>
                {codeText}
              </code>
            </pre>
          </div>
          <div className="flex justify-center w-full gap-8">
            {isEditing ? (
              <>
                <button
                  className="bg-blue-700 hover:bg-blue-500 p-4 rounded"
                  onClick={saveEditing}
                >
                  Save
                </button>
                <button
                  className="bg-blue-700 hover:bg-blue-500 p-4 rounded"
                  onClick={cancelEditing}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="bg-blue-700 hover:bg-blue-500 p-4 rounded"
                  onClick={() => downloadFile(codeText)}
                >
                  Download
                </button>
                <button
                  className="bg-blue-700 hover:bg-blue-500 p-4 rounded"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
                <button
                  className="bg-blue-700 hover:bg-blue-500 p-4 rounded"
                  onClick={() => {
                    setCodeText(generatedCode);
                    setTmpText(generatedCode);
                  }}
                >
                  Restore to original
                </button>
              </>
            )}
          </div>
        </>
      )}
      {selectedView === "Image" && (
        <>
          {status === "loading" ? (
            <div>loading</div>
          ) : (
            <div>
              <Image
                src={generatedImage}
                alt="generated image"
                width={500}
                height={500}
              />
              <button
                className="bg-blue-700 hover:bg-blue-500 p-4 rounded"
                onClick={() => {
                  getImage();
                }}
              >
                refresh
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GeneratedComponent;

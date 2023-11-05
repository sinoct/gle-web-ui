"use client";
import { PageSizeSetter } from "@/components/PageSizeSetter";
import { useEffect, useState } from "react";
import {
  baseTemplate,
  cursorMovementType,
  singleGraphTemplate,
  templateType,
  textType,
} from "../../public/graphTemplate";
import { generateCode } from "@/utils/templateSetter";
import CursorMove from "@/components/CursorMove";

import GeneratedComponent from "@/components/GeneratedComponent";
import DropDownMenu from "@/components/DropdownMenu";
import { toStringFromBase64 } from "@/utils/base64Handler";
import { generateLabel } from "@/utils/labelHelper";
import RenderObjectComponent from "@/components/RenderObjectComponent";
import Link from "next/link";

export default function Generator() {
  const [gleData, setGleData] = useState(baseTemplate);
  const [generatedImage, setGeneratedImage] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [renderedObjects, setRenderedObjects] = useState<
    (singleGraphTemplate | cursorMovementType | textType)[] | []
  >([]);
  const [cursorMovements, setCursorMovements] = useState<
    cursorMovementType[] | []
  >([]);
  const [renderObjectId, setRenderObjectId] = useState(1);

  const [status, setStatus] = useState<"idle" | "loading" | "finished">("idle");
  const [label, setLabel] = useState("default");

  const handleGenerateButtonClick = async () => {
    updateCode().then(callGeneration).then(getImage);
  };

  const updateCode = async () => {
    const code = await generateCode(gleData, label);
    setGeneratedCode(code);
    setStatus("loading");
    setTimeout(async () => {
      await getImage();
      setStatus("finished");
    }, 1000);
  };

  const callGeneration = async () => {
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        body: JSON.stringify({
          label,
        }),
      });
      let cucc = res;
      console.log(cucc);
    } catch (e) {
      console.log(e);
    }
  };

  const getImage = async () => {
    try {
      const res = await fetch(`api/get-image?label=${label}`, {
        method: "GET",
      });
      const cucc = await res.text();
      setGeneratedImage(`data:image/png;base64,${cucc}`);
    } catch (error) {
      console.log(error);
    }
  };

  const addGraph = () => {
    setRenderedObjects([
      ...renderedObjects,
      {
        id: renderObjectId,
        type: "graph",
        size: { width: 14, height: 12 },
        dataSources: [],
        displayElements: [],
        axis: {
          xAxis: {
            enabled: true,
          },
          yAxis: {
            enabled: true,
          },
        },
      },
    ]);
    setRenderObjectId(renderObjectId + 1);
  };

  const addCursorMovement = () => {
    setRenderedObjects([
      ...renderedObjects,
      {
        id: renderObjectId,
        type: "cursor",
        x: 0,
        y: 0,
      },
    ]);
    setRenderObjectId(renderObjectId + 1);
  };

  const addTextEditor = () => {
    setRenderedObjects([
      ...renderedObjects,
      {
        id: renderObjectId,
        type: "text",
        color: "black",
        offset: {
          type: "cursor",
          x: 0,
          y: 0,
        },
        nobox: false,
        height: 1,
        text: "",
      },
    ]);
    setRenderObjectId(renderObjectId + 1);
  };

  const updateRenderObject = (
    updatedItem: singleGraphTemplate | cursorMovementType | textType
  ) => {
    console.log("RENDER UPDATE:", updatedItem);
    setRenderedObjects(
      renderedObjects.map(
        (item: singleGraphTemplate | cursorMovementType | textType) => {
          let tmp = item;
          if (item.id === updatedItem.id) {
            tmp = updatedItem;
          }
          return tmp;
        }
      )
    );
  };

  const removeRenderedObject = (id: number) => {
    setRenderedObjects(
      (objects: (singleGraphTemplate | cursorMovementType | textType)[]) =>
        objects.filter((item) => item.id != id)
    );
  };

  const handleFileChange = (event: any) => {
    if (event.target.files) {
      console.log(event.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        let encoded = reader!.result!.toString().replace(/^data:(.*,)?/, "");
        if (encoded.length % 4 > 0) {
          encoded += "=".repeat(4 - (encoded.length % 4));
        }
        const importedObject = JSON.parse(
          toStringFromBase64(encoded)
        ) as templateType;
        setGleData(importedObject);
        if (importedObject.data.renderObjects) {
          //setGraphs(importedObject.data.graph);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const setInitialCursorMove = (movement: cursorMovementType) => {
    const updatedData = gleData;
    updatedData.data.cursorMove = movement;
    setGleData(updatedData);
  };

  const updateCursorMovements = (
    movement: cursorMovementType,
    index: number
  ) => {
    setCursorMovements(
      cursorMovements.map((item: cursorMovementType, i) => {
        let tmp = item;
        if (index === i) {
          tmp = movement;
        }
        return tmp;
      })
    );
  };

  useEffect(() => {
    let updatedData = gleData;
    updatedData.data.renderObjects = renderedObjects;
    setGleData(updatedData);
  }, [renderedObjects]);

  useEffect(() => {
    setLabel(generateLabel());
  }, []);

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="p-4 text-2xl md:text-3xl flex justify-center relative">
        GLE code generator
        <div className="absolute right-0 md:right-10">
          <DropDownMenu>
            <div className="flex flex-col gap-4">
              <button
                className="bg-blue-700 hover:bg-blue-500 p-4 rounded-md text-base"
                onClick={() => {
                  const link = document.createElement("a");
                  const file = new Blob([JSON.stringify(gleData)], {
                    type: "text/plain",
                  });
                  link.href = URL.createObjectURL(file);
                  link.download = "template.json";
                  link.click();
                  link.remove();
                }}
              >
                Export
              </button>
              <button
                className="bg-blue-700 hover:bg-blue-500 p-4 rounded-md text-base"
                onClick={() => {
                  const fileInput = document.createElement("input");
                  fileInput.type = "file";
                  const stuff = fileInput.click();
                  fileInput.onchange = handleFileChange;
                  console.log(stuff);
                }}
              >
                Import
              </button>
              <Link href={"/history"}>
                <div className="bg-blue-700 hover:bg-blue-500 p-4 rounded-md text-base">
                  History
                </div>
              </Link>
            </div>
          </DropDownMenu>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        <div className="flex flex-col gap-2 w-full">
          <div className="card">
            <PageSizeSetter template={gleData} templateSetter={setGleData} />
          </div>
          <div className="card">
            <CursorMove
              movement={gleData.data.cursorMove}
              movementSetter={setInitialCursorMove}
            />
          </div>
          {renderedObjects.map((renderItem) => {
            return (
              <div className="flex flex-col gap-4 card" key={renderItem.id}>
                <RenderObjectComponent
                  renderItem={renderItem}
                  itemUpdater={updateRenderObject}
                  itemRemover={removeRenderedObject}
                  label={label}
                />
              </div>
            );
          })}
          <div className="flex flex-col gap-4 card">
            {/* {graphs.map((graph: any) => {
              return (
                <div key={graph.id}>
                  <GraphEditor
                    graph={graph}
                    graphSetter={updateGraph}
                    removeGraph={removeGraph}
                    label={label}
                  />
                </div>
              );
            })} */}
            {/* {cursorMovements.length > 0 && (
              <div className="flex flex-col gap-4 inner">
                {cursorMovements.map(
                  (movement: cursorMovementType, index: number) => {
                    return (
                      <div key={index}>
                        <CursorMove
                          movement={movement}
                          movementSetter={(movement) =>
                            updateCursorMovements(movement, index)
                          }
                        ></CursorMove>
                      </div>
                    );
                  }
                )}
              </div>
            )} */}
            {/* {texts.length > 0 && (
              <div className="inner">
                {texts.map((text: textType, index: number) => {
                  return (
                    <div key={index}>
                      <TextEditor textData={text} index={index} />
                    </div>
                  );
                })}
              </div>
            )} */}

            <DropDownMenu
              dropDownButton={
                <button className="bg-blue-700 hover:bg-blue-500 p-4 rounded w-5/6">
                  Add
                </button>
              }
            >
              <div className="flex flex-col gap-4">
                <button
                  className="bg-blue-700 hover:bg-blue-500 p-4 rounded"
                  onClick={() => {
                    addGraph();
                  }}
                >
                  Add Graph
                </button>
                <button
                  className="bg-blue-700 hover:bg-blue-500 p-4 rounded"
                  onClick={() => {
                    addCursorMovement();
                  }}
                >
                  Add Cursor Move
                </button>
                <button
                  className="bg-blue-700 hover:bg-blue-500 p-4 rounded"
                  onClick={() => {
                    addTextEditor();
                  }}
                >
                  Add Text
                </button>
              </div>
            </DropDownMenu>
          </div>
        </div>
        <div className="flex w-full">
          {generatedImage ? (
            <GeneratedComponent
              generatedCode={generatedCode}
              generatedImage={generatedImage}
              getImage={getImage}
              status={status}
              label={label}
            />
          ) : (
            <div className="text-2xl text-center flex justify-center w-full">
              The generated code or image will be displayed here
            </div>
          )}
        </div>
      </div>

      <button
        className="bg-blue-700 hover:bg-blue-500 p-4 rounded"
        onClick={handleGenerateButtonClick}
      >
        Generate
      </button>
    </div>
  );
}

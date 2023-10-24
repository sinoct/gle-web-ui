"use client";
import { PageSizeSetter } from "@/components/PageSizeSetter";
import { ChangeEvent, useEffect, useState } from "react";
import {
  baseTemplate,
  cursorMovementType,
  singleGraphTemplate,
  templateType,
} from "../../public/graphTemplate";
import { generateCode } from "@/utils/templateSetter";
import CursorMove from "@/components/CursorMove";

import GraphEditor from "@/components/graphs/GraphEditor";
import GeneratedComponent from "@/components/GeneratedComponent";
import DropDownMenu from "@/components/DropdownMenu";
import { toStringFromBase64 } from "@/utils/base64Handler";
import { generateLabel } from "@/utils/labelHelper";

export default function Generator() {
  const [gleData, setGleData] = useState(baseTemplate);
  const [generatedImage, setGeneratedImage] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [graphs, setGraphs] = useState<singleGraphTemplate[] | []>([]);
  const [cursorMovements, setCursorMovements] = useState<
    cursorMovementType[] | []
  >([]);
  const [graphNumber, setGraphNumber] = useState(0);

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
    setGraphs([
      ...graphs,
      {
        id: graphNumber,
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
    setGraphNumber(graphNumber + 1);
  };

  const addCursorMovement = () => {
    console.log("ADD");
    setCursorMovements([
      ...cursorMovements,
      {
        x: 0,
        y: 0,
      },
    ]);
  };

  const removeGraph = (id: number) => {
    setGraphs((graphs: any) => graphs.filter((graph: any) => graph.id !== id));
  };

  const updateGraph = (updatedGraph: singleGraphTemplate) => {
    setGraphs(
      graphs.map((graph: singleGraphTemplate) => {
        let tmp = graph;
        if (graph.id === updatedGraph.id) {
          tmp = updatedGraph;
        }
        return tmp;
      })
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
        if (importedObject.data.graph) {
          setGraphs(importedObject.data.graph);
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
    updatedData.data.graph = graphs;
    setGleData(updatedData);
  }, [graphs]);

  useEffect(() => {
    let updatedData = gleData;
    updatedData.data.cursorMovements = cursorMovements;
    setGleData(updatedData);
  }, [cursorMovements]);

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
            </div>
          </DropDownMenu>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        <div className="flex flex-col gap-2">
          <div className="card">
            <PageSizeSetter template={gleData} templateSetter={setGleData} />
          </div>
          <div className="card">
            <CursorMove
              movement={gleData.data.cursorMove}
              movementSetter={setInitialCursorMove}
            />
          </div>
          <div className="flex flex-col gap-4 card">
            {graphs.map((graph: any) => {
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
            })}
            {cursorMovements.length > 0 && (
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
            )}

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
                  onClick={() => {}}
                >
                  Add Text
                </button>
              </div>
            </DropDownMenu>
          </div>
        </div>
        <div className="flex">
          {generatedImage ? (
            <GeneratedComponent
              generatedCode={generatedCode}
              generatedImage={generatedImage}
              getImage={getImage}
              status={status}
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

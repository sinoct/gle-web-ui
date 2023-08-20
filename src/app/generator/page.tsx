"use client";
import { PageSizeSetter } from "@/components/PageSizeSetter";
import { useEffect, useState } from "react";
import {
  baseTemplate,
  singleGraphTemplate,
} from "../../../public/graphTemplate";
import { generateCode } from "@/utils/templateSetter";
import CursorMove from "@/components/CursorMove";
import Image from "next/image";
import GraphEditor from "@/components/graphs/GraphEditor";
import GeneratedComponent from "@/components/GeneratedComponent";

export default function Generator() {
  const [gleData, setGleData] = useState(baseTemplate);
  const [generatedImage, setGeneratedImage] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [graphs, setGraphs] = useState<singleGraphTemplate[] | []>([]);
  const [graphNumber, setGraphNumber] = useState(0);

  const handleGenerateButtonClick = async () => {
    setGeneratedCode(generateCode(gleData));
    await callGeneration();
    await getImage();
  };

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
      setGeneratedImage(`data:image/png;base64,${cucc}`);
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    let updatedData = gleData;
    updatedData.data.graph = graphs;
    setGleData(updatedData);
  }, [graphs]);

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="p-4 text-3xl flex justify-center">GLE code generator</div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 basis-1/2">
          <div className="card">
            <PageSizeSetter template={gleData} templateSetter={setGleData} />
          </div>
          <div className="card">
            <CursorMove template={gleData} templateSetter={setGleData} />
          </div>
          <div className="flex flex-col gap-4 card">
            {graphs.map((graph: any) => {
              return (
                <div key={graph.id}>
                  <GraphEditor
                    graph={graph}
                    graphSetter={updateGraph}
                    removeGraph={removeGraph}
                  />
                </div>
              );
            })}
            <button
              className="bg-blue-700 hover:bg-blue-500 p-4 rounded"
              onClick={() => {
                setGraphs([
                  ...graphs,
                  {
                    id: graphNumber,
                    size: { width: 14, height: 12 },
                    data: "",
                    fileName: "data.txt",
                    columnX: 1,
                    columnY: 3,
                    settings: {
                      line: false,
                      marker: undefined,
                      color: undefined,
                      style: undefined,
                      impulses: undefined,
                      smooth: undefined,
                      deresolve: undefined,
                      key: undefined,
                    },
                  },
                ]);
                setGraphNumber(graphNumber + 1);
              }}
            >
              Add graph
            </button>
          </div>
        </div>
        <div className="flex basis-1/2">
          {generatedImage && (
            <GeneratedComponent
              generatedCode={generatedCode}
              generatedImage={generatedImage}
            />
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

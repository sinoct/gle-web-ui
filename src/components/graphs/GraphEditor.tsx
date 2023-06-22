/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import DataInput from "./DataInput";
import { singleGraphTemplate } from "../../../public/graphTemplate";
import markers from "@/app/types/lineParams/markers";

interface GraphEditorProps {
  graph: singleGraphTemplate;
  graphSetter: any;
  removeGraph: any;
}

const GraphEditor: FunctionComponent<GraphEditorProps> = ({
  graph,
  graphSetter,
  removeGraph,
}) => {
  const [currentGraph, setCurrentGraph] = useState(graph);

  const widthInputHandler = (newValue: any) => {
    newValue;
    setCurrentGraph({
      ...currentGraph,
      size: {
        width: newValue.target.value,
        height: currentGraph.size.height,
      },
    });
  };
  const heightInputHandler = (newValue: any) => {
    setCurrentGraph({
      ...currentGraph,
      size: {
        width: currentGraph.size.width,
        height: newValue.target.value,
      },
    });
  };

  const fileNameChangeHandler = (newValue: string) => {
    setCurrentGraph({
      ...currentGraph,
      fileName: newValue,
    });
  };

  const columnXInputHandler = (newValue: any) => {
    setCurrentGraph({
      ...currentGraph,
      columnX: newValue.target.value,
    });
  };

  const columnYInputHandler = (newValue: any) => {
    setCurrentGraph({
      ...currentGraph,
      columnY: newValue.target.value,
    });
  };

  const lineChangeHandler = (newValue: any) => {
    setCurrentGraph({
      ...currentGraph,
      settings: {
        ...currentGraph.settings,
        line: newValue.target.checked,
      },
    });
  };
  const markerSelectHandler = (newValue: any) => {
    console.log(newValue.target.value);
    setCurrentGraph({
      ...currentGraph,
      settings: {
        ...currentGraph.settings,
        marker: newValue.target.value,
      },
    });
  };

  useEffect(() => {
    graphSetter(currentGraph);
  }, [currentGraph]);

  return (
    <div className="relative">
      <div
        className="absolute right-5 cursor-pointer"
        onClick={() => removeGraph(graph.id)}
      >
        <Image
          src="/assets/cross.png"
          alt="generated image"
          width={36}
          height={36}
        />
      </div>
      <h1>Graph: {graph.id}</h1>
      <div>Set your desired page size:</div>
      <div className="flex flex-col gap-1">
        <label htmlFor="width"> Width</label>
        <input
          type="number"
          value={currentGraph.size.width}
          name="width"
          onInput={widthInputHandler}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="height"> Height</label>
        <input
          type="number"
          value={currentGraph.size.height}
          name="height"
          onInput={heightInputHandler}
        />
      </div>
      <div>
        <div>
          Attach your data stream:
          <DataInput fileNameSetter={fileNameChangeHandler} />
        </div>
        <div>
          Which columns should the graph show?
          <div className="flex">
            <div>
              X axis:
              <input
                type="number"
                onInput={columnXInputHandler}
                value={currentGraph.columnX}
              />
            </div>
            <div>
              Y axis:
              <input
                type="number"
                onInput={columnYInputHandler}
                value={currentGraph.columnY}
              />
            </div>
          </div>
          <div>Graph Settings:</div>
          <div className="flex-col">
            <label className="flex gap-4 items-center">
              Line:
              <input
                type="checkbox"
                checked={currentGraph.settings?.line}
                onChange={lineChangeHandler}
              />
            </label>
            <label className="flex gap-4 items-center">
              Marker:
              <select
                name="markers"
                id="markerID"
                onChange={markerSelectHandler}
              >
                {markers.map((marker) => (
                  <option key={marker} value={marker}>
                    {marker}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphEditor;

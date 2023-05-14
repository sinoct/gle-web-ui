import { FunctionComponent, useState } from "react";
import Image from "next/image";
import DataInput from "./DataInput";

interface GraphEditorProps {
  graph: any;
  graphSetter: any;
  removeGraph: any;
}

const GraphEditor: FunctionComponent<GraphEditorProps> = ({
  graph,
  graphSetter,
  removeGraph,
}) => {
  const [currentGraph, setCurrentGraph] = useState({
    size: {
      width: 10,
      height: 10,
    },
    data: [],
  });
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
  return (
    <div className="relative">
      <div className="absolute right-5" onClick={() => removeGraph(graph.id)}>
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
      {/*<div>
        Attach your data stream:
        <DataInput />
  </div> */}
    </div>
  );
};

export default GraphEditor;

/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import DataInput from "./DataInput";
import {
  axisType,
  barGraphSettings,
  lineGraphSettings,
  singleGraphTemplate,
} from "../../../public/graphTemplate";
import LineGraphSettings from "./LineGraphSettings";
import BarGraphSettings from "./BarGraphSettings";
import AxisSettings from "./AxisSettings";

interface GraphEditorProps {
  graph: singleGraphTemplate;
  graphSetter: any;
  removeGraph: any;
  label: string;
}

const GraphEditor: FunctionComponent<GraphEditorProps> = ({
  graph,
  graphSetter,
  removeGraph,
  label,
}) => {
  const [currentGraph, setCurrentGraph] = useState(graph);
  const [graphType, setGraphType] = useState("Line");

  const graphTypes = ["Line", "Bar"];

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

  const settingsUpdater = (newValue: lineGraphSettings | barGraphSettings) => {
    setCurrentGraph({
      ...currentGraph,
      settings: newValue,
    });
  };

  const graphTypeUpdater = (newValue: any) => {
    setCurrentGraph({
      ...currentGraph,
      settings: {
        ...currentGraph.settings,
        type: newValue.target.value,
      },
    });
    setGraphType(newValue.target.value);
  };

  const graphAxisUpdater = (newSettings: axisType) => {
    setCurrentGraph({
      ...currentGraph,
      axis: {
        ...newSettings,
      },
    });
  };

  useEffect(() => {
    graphSetter(currentGraph);
  }, [currentGraph]);

  return (
    <div className="relative">
      <div
        className="absolute right-5 top-5 cursor-pointer"
        onClick={() => removeGraph(graph.id)}
      >
        <Image
          src="/assets/cross.png"
          alt="generated image"
          width={36}
          height={36}
        />
      </div>
      <div className="section">
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
          <AxisSettings settings={graph.axis} axisSetter={graphAxisUpdater} />
          <div className="py-2">
            Attach your data stream:
            <DataInput fileNameSetter={fileNameChangeHandler} label={label} />
          </div>
          <div className="py-2">
            Which columns should the graph show?
            <div className="flex gap-2">
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
            <div className="inner mt-2">
              <h1>Graph Settings:</h1>
              <div className="py-2">
                <label>
                  Type of Graph:
                  <select
                    name="graphTypes"
                    id="graphType"
                    onChange={graphTypeUpdater}
                  >
                    {graphTypes.map((typeOfGraph: string) => (
                      <option key={typeOfGraph} value={typeOfGraph}>
                        {typeOfGraph}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                {graphType === "Line" ? (
                  <LineGraphSettings
                    settings={currentGraph.settings as lineGraphSettings}
                    settingsSetter={settingsUpdater}
                  />
                ) : (
                  <BarGraphSettings
                    settings={currentGraph.settings as barGraphSettings}
                    settingsSetter={settingsUpdater}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphEditor;

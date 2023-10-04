/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import DataInput from "./DataInput";
import {
  axisType,
  barGraphSettings,
  dataSourceType,
  displayElementType,
  lineGraphSettings,
  singleGraphTemplate,
} from "../../../public/graphTemplate";
import AxisSettings from "./AxisSettings";
import DropDownMenu from "../DropdownMenu";
import DisplayEditor from "./DisplayEditor";

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
  const [displayElementNumber, setDisplayElementNumber] = useState(1);
  const [dataSourceNumber, setDataSourceNumber] = useState(1);

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

  const fileNameChangeHandler = (index: number, name: string) => {
    let tmpSources = currentGraph.dataSources;
    tmpSources[index] = { ...tmpSources[index], fileName: name };
    setCurrentGraph({
      ...currentGraph,
      dataSources: tmpSources,
    });
  };

  const columnXInputHandler = (index: number, newValue: any) => {
    let tmpSources = currentGraph.dataSources;
    tmpSources[index] = {
      ...tmpSources[index],
      columnX: newValue.target.value,
    };
    setCurrentGraph({
      ...currentGraph,
      dataSources: tmpSources,
    });
  };

  const columnYInputHandler = (index: number, newValue: any) => {
    let tmpSources = currentGraph.dataSources;
    tmpSources[index] = {
      ...tmpSources[index],
      columnY: newValue.target.value,
    };
    setCurrentGraph({
      ...currentGraph,
      dataSources: tmpSources,
    });
  };

  const graphAxisUpdater = (newSettings: axisType) => {
    setCurrentGraph({
      ...currentGraph,
      axis: {
        ...newSettings,
      },
    });
  };

  const addDataSource = () => {
    let tmpSources = currentGraph.dataSources;
    tmpSources.push({
      columnX: 1,
      columnY: 2,
      name: `d${dataSourceNumber}`,
      fileName: "",
      data: "",
    });

    setCurrentGraph({
      ...currentGraph,
      dataSources: tmpSources,
    });
    setDataSourceNumber(dataSourceNumber + 1);
  };

  const addDisplayElement = (name: string) => {
    let tmpSources = currentGraph.displayElements;
    tmpSources.push({
      name,
      settings: {
        type: "Line",
        line: false,
        marker: undefined,
        color: undefined,
        style: undefined,
        impulses: undefined,
        smooth: undefined,
        deresolve: undefined,
        key: undefined,
      },
      id: displayElementNumber,
    });
    setCurrentGraph({
      ...currentGraph,
      displayElements: tmpSources,
    });
    setDisplayElementNumber(displayElementNumber + 1);
  };

  const updateDisplayElements = (
    updatedSettings: lineGraphSettings | barGraphSettings,
    id: number
  ) => {
    let tmpDisplayElements = currentGraph.displayElements;
    tmpDisplayElements = tmpDisplayElements.map((item) => {
      if (item.id === id) {
        item.settings = updatedSettings;
      }
      return item;
    });
    setCurrentGraph({
      ...currentGraph,
      displayElements: tmpDisplayElements,
    });
  };

  const removeSource = (name: string) => {
    let tmpSources = currentGraph.dataSources;
    tmpSources = tmpSources.filter(
      (source: dataSourceType) => source.name !== name
    );
    let tmpDisplay = currentGraph.displayElements;
    tmpDisplay = tmpDisplay.filter(
      (display: displayElementType) => display.name !== name
    );
    setCurrentGraph({
      ...currentGraph,
      dataSources: tmpSources,
      displayElements: tmpDisplay,
    });
  };

  const removeDisplayElement = (id: number) => {
    let tmpDisplay = currentGraph.displayElements;
    tmpDisplay = tmpDisplay.filter(
      (display: displayElementType) => display.id !== id
    );
    setCurrentGraph({
      ...currentGraph,
      displayElements: tmpDisplay,
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
        <div className="inner mt-4">
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
        </div>
        <div>
          <div className="inner my-2">
            <AxisSettings settings={graph.axis} axisSetter={graphAxisUpdater} />
          </div>
          {currentGraph.dataSources.map((source, index) => (
            <div key={source.name} className="inner relative">
              <div
                className="absolute right-5 top-5 cursor-pointer"
                onClick={() => removeSource(source.name)}
              >
                <Image
                  src="/assets/cross.png"
                  alt="generated image"
                  width={36}
                  height={36}
                />
              </div>
              Datastream {source.name}:
              <DataInput
                fileNameSetter={(name: string) =>
                  fileNameChangeHandler(index, name)
                }
                label={label}
              />
              Which columns should the graph show?
              <div className="flex gap-2">
                <div>
                  X axis:
                  <input
                    type="number"
                    onInput={(e) => columnXInputHandler(index, e)}
                    value={currentGraph.dataSources[index].columnX}
                  />
                </div>
                <div>
                  Y axis:
                  <input
                    type="number"
                    onInput={(e) => columnYInputHandler(index, e)}
                    value={currentGraph.dataSources[index].columnY}
                  />
                </div>
              </div>
              {currentGraph.displayElements.map((displayElement) => (
                <>
                  {displayElement.name === source.name && (
                    <div key={displayElement.id} className="relative">
                      <div
                        className="absolute right-5 top-5 cursor-pointer"
                        onClick={() => removeDisplayElement(displayElement.id)}
                      >
                        <Image
                          src="/assets/cross.png"
                          alt="generated image"
                          width={36}
                          height={36}
                        />
                      </div>
                      <DisplayEditor
                        id={displayElement.id}
                        name={displayElement.name}
                        settings={displayElement.settings}
                        stateUpdater={updateDisplayElements}
                      ></DisplayEditor>
                    </div>
                  )}
                </>
              ))}
              <button
                className="bg-blue-700 hover:bg-blue-500 p-4 rounded-md text-base"
                onClick={() =>
                  addDisplayElement(currentGraph.dataSources[index].name)
                }
              >
                New Display Element
              </button>
            </div>
          ))}
          <DropDownMenu
            dropDownButton={
              <button className="bg-blue-700 hover:bg-blue-500 p-4 rounded w-5/6">
                Add
              </button>
            }
          >
            <div className="flex flex-col gap-4">
              <button
                className="bg-blue-700 hover:bg-blue-500 p-4 rounded-md text-base"
                onClick={addDataSource}
              >
                New Datasurces
              </button>
            </div>
          </DropDownMenu>
        </div>
      </div>
    </div>
  );
};

export default GraphEditor;

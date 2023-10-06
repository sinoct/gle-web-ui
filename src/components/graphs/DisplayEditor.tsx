import { FunctionComponent, useEffect, useState } from "react";
import BarGraphSettings from "./BarGraphSettings";
import LineGraphSettings from "./LineGraphSettings";
import {
  barGraphSettings,
  lineGraphSettings,
} from "../../../public/graphTemplate";

interface DisplayEditorProps {
  id: number;
  name: string;
  settings: lineGraphSettings | barGraphSettings;
  stateUpdater: any;
}

const DisplayEditor: FunctionComponent<DisplayEditorProps> = ({
  id,
  name,
  settings,
  stateUpdater,
}) => {
  const [graphType, setGraphType] = useState("Line");
  const [elementSettings, setElementSettings] = useState(settings);

  const graphTypes = ["Line", "Bar"];
  const settingsUpdater = (newValue: lineGraphSettings | barGraphSettings) => {
    setElementSettings({
      ...newValue,
    });
  };

  const elementTypeUpdater = (newValue: any) => {
    setElementSettings({
      ...settings,
      type: newValue.target.value,
    });
    setGraphType(newValue.target.value);
  };

  useEffect(() => {
    stateUpdater(elementSettings, id);
  }, [elementSettings]);
  return (
    <div className="py-2">
      <div className="inner mt-2">
        <h1>Graph Settings:</h1>
        <div className="py-2">
          <label>
            Type of Graph:
            <select
              name="graphTypes"
              id="graphType"
              onChange={elementTypeUpdater}
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
              settings={elementSettings as lineGraphSettings}
              settingsSetter={settingsUpdater}
            />
          ) : (
            <BarGraphSettings
              settings={elementSettings as barGraphSettings}
              settingsSetter={settingsUpdater}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayEditor;

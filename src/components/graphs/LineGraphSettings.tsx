import { FunctionComponent, useEffect, useState } from "react";
import { lineGraphSettings } from "../../../public/graphTemplate";
import ColorPicker from "./ColorPicker";
import LineStylePicker from "./LineStylePicker";
import MarkerEditor from "./MarkerEditor";

interface LineGraphSettingsProps {
  settings: lineGraphSettings;
  settingsSetter: any;
}

const LineGraphSettings: FunctionComponent<LineGraphSettingsProps> = ({
  settings,
  settingsSetter,
}) => {
  const [currentSettings, setCurrentSettings] = useState(settings);

  const lineChangeHandler = (newValue: any) => {
    setCurrentSettings({
      ...currentSettings,
      line: newValue.target.checked,
    });
  };

  const markerSelectHandler = (newValue: any) => {
    setCurrentSettings({
      ...currentSettings,
      marker: newValue.target.value,
    });
  };
  const colorSelectHandler = (newValue: any) => {
    setCurrentSettings({
      ...currentSettings,
      color: newValue.target.value,
    });
  };
  const lineStyleHandler = (newValue: any) => {
    setCurrentSettings({
      ...currentSettings,
      line: newValue.target.value,
    });
  };

  const smoothChangeHandler = (newValue: any) => {
    setCurrentSettings({
      ...currentSettings,
      smooth: newValue.target.checked,
    });
  };
  const impulseChangeHandler = (newValue: any) => {
    setCurrentSettings({
      ...currentSettings,
      impulses: newValue.target.checked,
    });
  };
  const deresolveChangeHandler = (newValue: any) => {
    setCurrentSettings({
      ...currentSettings,
      deresolve: newValue.target.checked,
    });
  };
  const keyChangeHandler = (newValue: any) => {
    setCurrentSettings({
      ...currentSettings,
      key: newValue.target.checked,
    });
  };

  useEffect(() => {
    settingsSetter(currentSettings);
  }, [currentSettings]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-1">
        <label className="flex gap-4 items-center">
          Line:
          <input
            type="checkbox"
            checked={settings?.line}
            onChange={lineChangeHandler}
          />
        </label>
        <MarkerEditor
          markerUpdater={markerSelectHandler}
          selectedMarker={settings?.marker as string}
        />
        <ColorPicker
          colorUpdater={colorSelectHandler}
          selectedColor={settings?.color as string}
        />
        <LineStylePicker styleUpdater={lineStyleHandler} />
      </div>
      <label className="flex gap-4 items-center">
        Smooth:
        <input
          type="checkbox"
          checked={settings?.smooth}
          onChange={smoothChangeHandler}
        />
      </label>
      <label className="flex gap-4 items-center">
        Impulses:
        <input
          type="checkbox"
          checked={settings?.impulses}
          onChange={impulseChangeHandler}
        />
      </label>
      <label className="flex gap-4 items-center">
        Deresolve:
        <input
          type="number"
          checked={settings?.impulses}
          onChange={deresolveChangeHandler}
        />
      </label>
      <label className="flex gap-4 items-center">
        Key:
        <input
          type="text"
          checked={settings?.impulses}
          onChange={keyChangeHandler}
        />
      </label>
    </div>
  );
};

export default LineGraphSettings;

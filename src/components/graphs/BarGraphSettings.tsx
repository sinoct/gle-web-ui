import { FunctionComponent, useEffect, useState } from "react";
import { barGraphSettings } from "../../../public/graphTemplate";
import ColorPicker from "./ColorPicker";

interface BarGraphSettingsProps {
  settings: barGraphSettings;
  settingsSetter: any;
}

const BarGraphSettings: FunctionComponent<BarGraphSettingsProps> = ({
  settings,
  settingsSetter,
}) => {
  const [currentSettings, setCurrentSettings] = useState(settings);

  const colorSelectHandler = (newValue: any) => {
    setCurrentSettings({
      ...currentSettings,
      color: newValue.target.value,
    });
  };
  const fillSelectHandler = (newValue: any) => {
    setCurrentSettings({
      ...currentSettings,
      fill: newValue.target.value,
    });
  };

  const widthChangeHandler = (newValue: any) => {
    setCurrentSettings({
      ...currentSettings,
      width: newValue.target.value,
    });
  };

  useEffect(() => {
    settingsSetter(currentSettings);
  }, [currentSettings]);

  return (
    <div className="">
      <div className="flex flex-col gap-2">
        <ColorPicker
          colorUpdater={colorSelectHandler}
          selectedColor={settings?.color as string}
        />

        <ColorPicker
          colorUpdater={fillSelectHandler}
          selectedColor={settings?.fill as string}
          labelText="Fill"
        />

        <label className="flex gap-4 items-center">
          Width:
          <input
            type="number"
            min={0}
            step={0.1}
            onChange={widthChangeHandler}
          />
        </label>
      </div>
    </div>
  );
};

export default BarGraphSettings;

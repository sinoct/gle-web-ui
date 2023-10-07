import { FunctionComponent, useState } from "react";
import { axisType } from "../../../public/graphTemplate";

interface AxisSettingsProps {
  settings: axisType;
  axisSetter: (newSettings: axisType) => void;
}

const AxisSettings: FunctionComponent<AxisSettingsProps> = ({
  settings,
  axisSetter,
}) => {
  const enabledHandler = (axis: "xAxis" | "yAxis", newValue: any) => {
    axisSetter({
      ...settings,
      [axis]: {
        ...settings[axis],
        enabled: newValue.target.checked,
      },
    });
  };

  const logarithmHandler = (axis: "xAxis" | "yAxis", newValue: any) => {
    axisSetter({
      ...settings,
      [axis]: {
        ...settings[axis],
        log: newValue.target.checked,
      },
    });
  };

  const minimumHandler = (axis: "xAxis" | "yAxis", newValue: any) => {
    axisSetter({
      ...settings,
      [axis]: {
        ...settings[axis],
        min: newValue.target.value,
      },
    });
  };

  const maximumHandler = (axis: "xAxis" | "yAxis", newValue: any) => {
    axisSetter({
      ...settings,
      [axis]: {
        ...settings[axis],
        max: newValue.target.value,
      },
    });
  };

  return (
    <div className="py-2">
      Axis settings:
      <div>
        X axis:
        <div>
          <div>
            <label className="flex flex-col md:flex-row items-center gap-2">
              Enable:
              <input
                type="checkbox"
                checked={settings.xAxis.enabled}
                onChange={(e) => enabledHandler("xAxis", e)}
              />
            </label>
          </div>
          {settings.xAxis.enabled && (
            <div className="flex flex-col md:flex-row gap-4">
              <label className="flex flex-col md:flex-row items-center gap-2">
                Logarithmic:
                <input
                  type="checkbox"
                  checked={settings.xAxis.log}
                  onChange={(e) => logarithmHandler("xAxis", e)}
                />
              </label>
              <label className="flex flex-col md:flex-row items-center gap-2">
                Minimum:
                <input
                  type="number"
                  value={settings.xAxis.min}
                  onChange={(e) => minimumHandler("xAxis", e)}
                />
              </label>
              <label className="flex flex-col md:flex-row items-center gap-2">
                Maximum:
                <input
                  type="number"
                  value={settings.xAxis.max}
                  onChange={(e) => maximumHandler("xAxis", e)}
                />
              </label>
            </div>
          )}
        </div>
      </div>
      <div>
        Y axis:
        <div>
          <div>
            <label className="flex flex-col md:flex-row items-center gap-2">
              Enable:
              <input
                type="checkbox"
                checked={settings.yAxis.enabled}
                onChange={(e) => enabledHandler("yAxis", e)}
              />
            </label>
          </div>
          {settings.yAxis.enabled && (
            <div className="flex flex-col md:flex-row gap-4">
              <label className="flex flex-col md:flex-row items-center gap-2">
                Logarithmic:
                <input
                  type="checkbox"
                  checked={settings.yAxis.log}
                  onChange={(e) => logarithmHandler("yAxis", e)}
                />
              </label>
              <label className="flex flex-col md:flex-row items-center gap-2">
                Minimum:
                <input
                  type="number"
                  value={settings.yAxis.min}
                  onChange={(e) => minimumHandler("yAxis", e)}
                />
              </label>
              <label className="flex flex-col md:flex-row items-center gap-2">
                Maximum:
                <input
                  type="number"
                  value={settings.yAxis.max}
                  onChange={(e) => maximumHandler("yAxis", e)}
                />
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AxisSettings;

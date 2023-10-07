import { FunctionComponent } from "react";
import colors from "@/app/types/lineParams/colors";
import Image from "next/image";

interface MarkerEditorProps {
  colorUpdater: any;
  selectedColor: string;
  labelText?: string;
}

const ColorPicker: FunctionComponent<MarkerEditorProps> = ({
  colorUpdater,
  selectedColor,
  labelText = "Color",
}) => {
  return (
    <label className="flex flex-col md:flex-row gap-4 items-center">
      {labelText}:
      <select name="colors" id="colorID" onChange={colorUpdater}>
        {Object.keys(colors).map((key, value) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <div
        style={{
          backgroundColor: `#${colors[selectedColor]}`,
        }}
        className="h-4 w-8"
      ></div>
    </label>
  );
};

export default ColorPicker;

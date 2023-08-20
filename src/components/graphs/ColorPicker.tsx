import { FunctionComponent } from "react";
import colors from "@/app/types/lineParams/colors";
import Image from "next/image";

interface MarkerEditorProps {
  colorUpdater: any;
  selectedColor: string;
}

const ColorPicker: FunctionComponent<MarkerEditorProps> = ({
  colorUpdater,
  selectedColor,
}) => {
  return (
    <label className="flex gap-4 items-center">
      Color:
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

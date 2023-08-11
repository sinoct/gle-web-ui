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
  console.log(selectedColor);
  return (
    <label className="flex gap-4 items-center">
      Color:
      <select name="colors" id="colorID" onChange={colorUpdater}>
        {colors.map((color) => (
          <option key={color.name} value={color.color}>
            {color.name}
          </option>
        ))}
      </select>
      <div
        style={{
          backgroundColor: `#${selectedColor}`,
        }}
        className="h-4 w-8"
      ></div>
    </label>
  );
};

export default ColorPicker;

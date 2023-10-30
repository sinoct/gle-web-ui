import { FunctionComponent, useEffect, useState } from "react";
import MathInput from "react-math-keyboard";
import { textType } from "../../public/graphTemplate";
import ColorPicker from "./graphs/ColorPicker";

interface TextEditorProps {
  textData: textType;
}

const TextEditor: FunctionComponent<TextEditorProps> = ({ textData }) => {
  const [latex, setLatex] = useState(textData.text);
  const [color, setColor] = useState(textData.color);
  const [height, setHeight] = useState(textData.height);

  const colorSelectHandler = (newValue: any) => {
    setColor(newValue.target.value);
  };

  const heightInputHandler = (newValue: any) => {
    setHeight(newValue.target.value);
  };

  useEffect(() => {
    console.log("SETTINGS CHANGED", latex);
  }, [latex, color, height]);
  return (
    <div>
      <div className="flex flex-col gap-1">
        <label htmlFor="width"> Height</label>
        <input
          type="number"
          value={height}
          name="width"
          onInput={heightInputHandler}
        />
      </div>
      <ColorPicker colorUpdater={colorSelectHandler} selectedColor={color} />
      <div className="flex flex-col gap-1">
        <label htmlFor="latexEditor">LaTeX text</label>
        <MathInput name="latexEditor" setValue={setLatex}></MathInput>
      </div>
    </div>
  );
};

export default TextEditor;

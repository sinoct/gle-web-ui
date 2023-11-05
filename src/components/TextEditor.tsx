import { FunctionComponent, useEffect, useState } from "react";
import MathInput from "react-math-keyboard";
import { cursorMovementType, textType } from "../../public/graphTemplate";
import CursorMove from "./CursorMove";
import ColorPicker from "./graphs/ColorPicker";

interface TextEditorProps {
  textData: textType;
  textSetter: (movement: textType) => void;
}

const TextEditor: FunctionComponent<TextEditorProps> = ({
  textData,
  textSetter,
}) => {
  const [latex, setLatex] = useState(textData.text);
  const [color, setColor] = useState(textData.color);
  const [height, setHeight] = useState(textData.height);
  const [offset, setOffset] = useState(textData.offset);
  const [nobox, setNoBox] = useState(textData.nobox);

  const colorSelectHandler = (newValue: any) => {
    setColor(newValue.target.value);
  };

  const heightInputHandler = (newValue: any) => {
    setHeight(newValue.target.value);
  };

  const offsetUpdateHandler = (newValue: cursorMovementType) => {
    setOffset(newValue);
  };

  const noboxUpdateHandler = (newValue: any) => {
    setNoBox(newValue.target.checked);
  };

  useEffect(() => {
    textSetter({
      ...textData,
      color,
      height,
      offset,
      nobox,
      text: latex,
    });
  }, [latex, color, height, offset, nobox]);
  return (
    <div className="inner flex flex-col gap-4">
      <div className="flex flex-col">
        <label htmlFor="width"> Height</label>
        <input
          type="number"
          value={height}
          step="0.1"
          min={0.1}
          name="width"
          onInput={heightInputHandler}
        />
      </div>
      <CursorMove
        movement={offset}
        movementSetter={offsetUpdateHandler}
        label="Set offset:"
      />
      <ColorPicker colorUpdater={colorSelectHandler} selectedColor={color} />
      <label className="flex gap-4 items-center">
        Box container:
        <input type="checkbox" checked={nobox} onChange={noboxUpdateHandler} />
      </label>
      <div className="flex flex-col gap-1">
        <label htmlFor="latexEditor">LaTeX text</label>
        <MathInput name="latexEditor" setValue={setLatex}></MathInput>
      </div>
    </div>
  );
};

export default TextEditor;

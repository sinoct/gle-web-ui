import { TemplateSetterProps } from "@/app/types/types";
import { FunctionComponent, useEffect, useState } from "react";
import { cursorMovementType } from "../../public/graphTemplate";
import Image from "next/image";
import TooltipComponent from "./TooltipComponent";

interface CursorMoveProps {
  label?: string;
  movement: cursorMovementType;
  movementSetter: (movement: cursorMovementType) => void;
}

const CursorMove: FunctionComponent<CursorMoveProps> = ({
  label,
  movement,
  movementSetter,
}) => {
  const [xAxis, setXAxis] = useState(movement.x);
  const [yAxis, setYAxis] = useState(movement.y);

  const xAxisInputHandler = (newValue: any) => {
    setXAxis(newValue.target.value);
  };
  const yAxisInputHandler = (newValue: any) => {
    setYAxis(newValue.target.value);
  };

  useEffect(() => {
    movementSetter({ type: "cursor", x: xAxis, y: yAxis });
  }, [xAxis, yAxis]);

  useEffect(() => {
    setXAxis(movement.x);
    setYAxis(movement.y);
  }, [movement]);
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center relative">
      <div className="absolute right-2 top-1 cursor-pointer">
        <TooltipComponent
          text={
            "This will set the cursor position to the set coordinates, calculated from the bottom left corner."
          }
        />
      </div>
      <div>{label || "Set cursor coordinates:"}</div>
      <div className="flex flex-col gap-1">
        <label htmlFor="xAxis">X Axis</label>
        <input
          type="number"
          value={xAxis}
          name="xAxis"
          onInput={xAxisInputHandler}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="yAxis"> Y Axis</label>
        <input
          type="number"
          value={yAxis}
          name="yAxis"
          onInput={yAxisInputHandler}
        />
      </div>
    </div>
  );
};

export default CursorMove;

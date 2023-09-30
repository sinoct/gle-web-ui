import { TemplateSetterProps } from "@/app/types/types";
import { FunctionComponent, useEffect, useState } from "react";

const CursorMove: FunctionComponent<TemplateSetterProps> = ({
  template,
  templateSetter,
}) => {
  const [xAxis, setXAxis] = useState(template.data.cursorMove.x);
  const [yAxis, setYAxis] = useState(template.data.cursorMove.y);

  useEffect(() => {
    setXAxis(template.data.cursorMove.x);
    setYAxis(template.data.cursorMove.y);
  }, [template]);

  const xAxisInputHandler = (newValue: any) => {
    const updatedTemplate = template;
    updatedTemplate.data.cursorMove.x = newValue.target.value;
    templateSetter(updatedTemplate);
    setXAxis(newValue.target.value);
  };
  const yAxisInputHandler = (newValue: any) => {
    const updatedTemplate = template;
    updatedTemplate.data.cursorMove.y = newValue.target.value;
    templateSetter(updatedTemplate);
    setYAxis(newValue.target.value);
  };
  return (
    <div className="flex gap-8 items-center">
      <div>Set your desired page size:</div>
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

"use client";
import { FunctionComponent, useEffect, useState } from "react";

import { TemplateSetterProps } from "@/app/types/types";

export const PageSizeSetter: FunctionComponent<TemplateSetterProps> = ({
  template,
  templateSetter,
}) => {
  const [width, setWidth] = useState(template.data.pageSize.width);
  const [height, setHeight] = useState(template.data.pageSize.height);

  useEffect(() => {
    setWidth(template.data.pageSize.width);
    setHeight(template.data.pageSize.height);
  }, [template]);

  const widthInputHandler = (newValue: any) => {
    const updatedTemplate = template;
    updatedTemplate.data.pageSize.width = newValue.target.value;
    templateSetter(updatedTemplate);
    setWidth(newValue.target.value);
  };
  const heightInputHandler = (newValue: any) => {
    const updatedTemplate = template;
    updatedTemplate.data.pageSize.height = newValue.target.value;
    templateSetter(updatedTemplate);
    setHeight(newValue.target.value);
  };
  return (
    <div className="flex gap-8 items-center">
      <div>Set your desired page size:</div>
      <div className="flex flex-col gap-1">
        <label htmlFor="width"> Width</label>
        <input
          type="number"
          value={width}
          name="width"
          onInput={widthInputHandler}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="height"> Height</label>
        <input
          type="number"
          value={height}
          name="height"
          onInput={heightInputHandler}
        />
      </div>
    </div>
  );
};

"use client";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";

import { templateType } from "../../public/graphTemplate";

interface PageSizeSetterProps {
  template: templateType;
  templateSetter: Dispatch<SetStateAction<templateType>>;
}

export const PageSizeSetter: FunctionComponent<PageSizeSetterProps> = ({
  template,
  templateSetter,
}) => {
  const [width, setWidth] = useState(20);
  const [height, setHeight] = useState(20);

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
      <div className="flex flex-col gap-4">
        <label htmlFor="width"> Width</label>
        <input
          type="number"
          value={width}
          name="width"
          onInput={widthInputHandler}
        />
      </div>
      <div className="flex flex-col gap-4">
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

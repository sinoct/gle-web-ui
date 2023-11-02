"use client";

import { FunctionComponent, useState } from "react";

interface HistoryPickerProps {
  directories: string[];
}

const HistoryPicker: FunctionComponent<HistoryPickerProps> = ({
  directories,
}) => {
  const [gleCode, setGleCode] = useState("");
  const [image, setImage] = useState("");
  const directorySelected = async (event: any) => {
    console.log(event.target.value);
    let res = await fetch(`/api/get-code?label=${event.target.value}`);
    const code = await res.text();
    setGleCode(code);
    res = await fetch(`/api/get-image?label=${event.target.value}`);
    try {
      const image = await res.text();
      setImage(`data:image/png;base64,${image}`);
    } catch (error) {
      setImage("error");
    }
  };

  return (
    <div className="py-8 text-xl">
      {directories && directories.length > 0 ? (
        <>
          <label className="flex flex-col gap-4 items-center">
            Select a directory:
            <select
              name="directory"
              id="directoryID "
              onChange={directorySelected}
            >
              {directories.map((dir) => (
                <option key={dir} value={dir}>
                  {dir}
                </option>
              ))}
            </select>
          </label>
        </>
      ) : (
        <div>No Previoius directories found</div>
      )}
    </div>
  );
};

export default HistoryPicker;

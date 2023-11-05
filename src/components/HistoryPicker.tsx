"use client";

import { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getDirectories } from "@/utils/directoryFetch";
import HistoryElements from "./HistoryElements";

const HistoryPicker: FunctionComponent = ({}) => {
  const [gleCode, setGleCode] = useState("");
  const [image, setImage] = useState("");
  const [currentDirectories, setCurrentDirectiories] = useState([]);
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

  const refresh = async () => {
    const res = await getDirectories();
    setCurrentDirectiories(res);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="py-8 text-xl w-full">
      <Link
        href={"/"}
        className="absolute left-5 top-5 cursor-pointer bg-white rounded-xl p-2 flex text-black items-center"
      >
        <Image
          src="/assets/left-arrow.png"
          alt="generated image"
          width={36}
          height={36}
        />
        <div className="hidden md:block">Back to home</div>
      </Link>
      <div className="flex flex-col gap-2 justify-center items-center">
        {currentDirectories && currentDirectories.length > 0 ? (
          <>
            <label className="flex flex-col gap-4 items-center">
              Select a directory:
              <select
                name="directory"
                id="directoryID "
                onChange={directorySelected}
              >
                {currentDirectories.map((dir) => (
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
        <button
          className="bg-blue-700 hover:bg-blue-500 p-4 rounded-md text-base"
          onClick={refresh}
        >
          Refresh
        </button>
      </div>
      <div className="flex w-full pt-4">
        <HistoryElements code={gleCode} image={image} />
      </div>
    </div>
  );
};

export default HistoryPicker;

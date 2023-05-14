import { ChangeEvent, FunctionComponent, useState } from "react";

const DataInput: FunctionComponent = () => {
  const uploadDataStream = async (file: any) => {
    try {
      console.log("HELLO");
      const formData = new FormData();
      formData.set("file", file);
      const res = await fetch("/api/upload-data", {
        method: "POST",
        body: formData,
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log("HALIKA", event.target.files[0]);
      uploadDataStream(event.target.files[0]);
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default DataInput;

import { ChangeEvent, FunctionComponent, useState } from "react";

const DataInput: FunctionComponent = () => {
  const uploadDataStream = async (file: any) => {
    try {
      await fetch("/api/upload-data", {
        method: "POST",
        body: JSON.stringify({ file }),
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        let encoded = reader!.result!.toString().replace(/^data:(.*,)?/, "");
        if (encoded.length % 4 > 0) {
          encoded += "=".repeat(4 - (encoded.length % 4));
        }
        uploadDataStream(encoded);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default DataInput;

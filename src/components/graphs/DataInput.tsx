import { ChangeEvent, FunctionComponent, useState } from "react";

interface DataInputProps {
  fileNameSetter: any;
  label: string;
}

const DataInput: FunctionComponent<DataInputProps> = ({
  fileNameSetter,
  label,
}) => {
  const uploadDataStream = async (file: any, fileName: string) => {
    try {
      await fetch(`/api/upload-data?file-name=${fileName}`, {
        method: "POST",
        body: JSON.stringify({ file, label }),
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log(event.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        let encoded = reader!.result!.toString().replace(/^data:(.*,)?/, "");
        if (encoded.length % 4 > 0) {
          encoded += "=".repeat(4 - (encoded.length % 4));
        }
        uploadDataStream(encoded, event.target.files![0]!.name);
        fileNameSetter(event.target.files![0]!.name);
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

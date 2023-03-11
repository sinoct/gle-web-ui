import { templateType } from "../../public/graphTemplate";

export const generateText = (data: templateType) => {
  let text = `size ${data.data.pageSize.width} ${data.data.pageSize.height} \n`;
  return text;
};

export const downloadFile = (text: string) => {
  const link = document.createElement("a");
  const file = new Blob([text], { type: "text/plain" });
  link.href = URL.createObjectURL(file);
  link.download = "sample.gle";
  link.click();
};

export const generateCode = (data: templateType) => {
  const text = generateText(data);
  downloadFile(text);
};

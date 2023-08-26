import { templateType } from "../../public/graphTemplate";
import { generateGraphText } from "./templateTextGenerators";

export const generateText = (data: templateType) => {
  const params = data.data;
  let text = `size ${params.pageSize.width} ${params.pageSize.height} \n`;
  if (params.cursorMove) {
    text += `\namove ${params.cursorMove.x} ${params.cursorMove.y} \n`;
  }
  if (params.graph) {
    params.graph.map((currentGraph, index) => {
      text += generateGraphText(currentGraph, index);
    });
  }
  return text;
};

export const downloadFile = async (text: string) => {
  const link = document.createElement("a");
  const file = new Blob([text], { type: "text/plain" });
  link.href = URL.createObjectURL(file);
  link.download = "graph.gle";
  link.click();
};

export const generateCode = (data: templateType) => {
  const text = generateText(data);
  try {
    const res = fetch("/api/save-image", {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }

  //TODO: invoke it on a download button click
  // downloadFile(text);
  return text;
};

import { templateType } from "../../public/graphTemplate";
import { generateRenderObjectCode } from "./templateTextGenerators";

export const generateText = (data: templateType) => {
  const params = data.data;
  let text = `size ${params.pageSize.width} ${params.pageSize.height} \n`;
  if (params.cursorMove) {
    text += `\namove ${params.cursorMove.x} ${params.cursorMove.y} \n`;
  }
  if (params.renderObjects) {
    params.renderObjects.map((item) => {
      text += generateRenderObjectCode(item);
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
  link.remove();
};

export const generateCode = async (data: templateType, label: string) => {
  const text = generateText(data);
  try {
    const res = await fetch("/api/save-code", {
      method: "POST",
      body: JSON.stringify({ text, label }),
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

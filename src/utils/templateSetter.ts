import { templateType } from "../../public/graphTemplate";

export const generateText = (data: templateType) => {
  const params = data.data;
  let text = `size ${params.pageSize.width} ${params.pageSize.height} \n`;
  if (params.cursorMove) {
    text += `\namove ${params.cursorMove.x} ${params.cursorMove.y} \n`;
  }
  if (params.graph) {
    text += `begin graph\n  size ${params.graph[0].size.width} ${params.graph[0].size.height}\n   data data.txt d1=c${params.graph[0].columnX},c${params.graph[0].columnY}\n   d1 line marker fcircle \n`;
    text += "end graph";
  }
  return text;
};

export const downloadFile = async (text: string) => {
  const link = document.createElement("a");
  const file = new Blob([text], { type: "text/plain" });
  // try {
  //   console.log("writing file");
  //   await writeFileSync("sample.gle", text);
  // } catch (error) {
  //   console.log("write error", error);
  // }
  try {
    const res = await fetch("/api/save-image", {
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
  link.href = URL.createObjectURL(file);
  link.download = "sample.gle";
  link.click();
};

export const generateCode = (data: templateType) => {
  const text = generateText(data);
  downloadFile(text);
};

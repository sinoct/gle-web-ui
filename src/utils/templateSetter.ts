import { templateType } from "../../public/graphTemplate";

export const generateText = (data: templateType) => {
  const params = data.data;
  let text = `size ${params.pageSize.width} ${params.pageSize.height} \n`;
  if (params.cursorMove) {
    text += `\namove ${params.cursorMove.x} ${params.cursorMove.y} \n`;
  }
  if (params.graph) {
    params.graph.map((currentGraph, index) => {
      text += `begin graph\n  size ${currentGraph.size.width} ${
        currentGraph.size.height
      }\n   data ${currentGraph.fileName} d${index + 1}=c${
        currentGraph.columnX
      },c${currentGraph.columnY}\n`;
      text += `d${index + 1} ${currentGraph.settings?.line ? "line" : ""} ${
        currentGraph.settings?.marker
          ? `marker ${currentGraph.settings?.marker}`
          : ""
      } ${
        currentGraph.settings?.color
          ? `color ${currentGraph.settings?.color}`
          : ""
      } ${
        currentGraph.settings?.style
          ? `lstyle ${currentGraph.settings.style}`
          : ""
      } ${currentGraph.settings?.smooth ? "smooth" : ""} ${
        currentGraph.settings?.impulses ? "impulses" : ""
      } ${
        currentGraph.settings?.deresolve
          ? `deresolve ${currentGraph.settings.deresolve}`
          : ""
      } ${
        currentGraph.settings?.key ? `key ${currentGraph.settings.key}` : ""
      }\n`;
      text += "end graph";
    });
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
  link.download = "graph.gle";
  link.click();
};

export const generateCode = (data: templateType) => {
  const text = generateText(data);
  downloadFile(text);
  return text;
};

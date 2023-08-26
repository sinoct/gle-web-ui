import { singleGraphTemplate } from "../../public/graphTemplate";

export const generateGraphText = (
  graphObject: singleGraphTemplate,
  index: number
) => {
  let graphText = "";
  if (graphObject.settings?.type === "line") {
    graphText += `begin graph\n  size ${graphObject.size.width} ${
      graphObject.size.height
    }\n   data ${graphObject.fileName} d${index + 1}=c${graphObject.columnX},c${
      graphObject.columnY
    }\n`;
    graphText += `d${index + 1} ${graphObject.settings?.line ? "line" : ""} ${
      graphObject.settings?.marker
        ? `marker ${graphObject.settings?.marker}`
        : ""
    } ${
      graphObject.settings?.color ? `color ${graphObject.settings?.color}` : ""
    } ${
      graphObject.settings?.style ? `lstyle ${graphObject.settings.style}` : ""
    } ${graphObject.settings?.smooth ? "smooth" : ""} ${
      graphObject.settings?.impulses ? "impulses" : ""
    } ${
      graphObject.settings?.deresolve
        ? `deresolve ${graphObject.settings.deresolve}`
        : ""
    } ${graphObject.settings?.key ? `key ${graphObject.settings.key}` : ""}\n`;
    graphText += "end graph";
  } else {
  }

  return graphText;
};

import { singleGraphTemplate } from "../../public/graphTemplate";

export const generateGraphText = (
  graphObject: singleGraphTemplate,
  index: number
) => {
  let graphText = "";
  graphText += `begin graph\n  size ${graphObject.size.width} ${
    graphObject.size.height
  }\n ${
    graphObject.axis.xAxis.enabled
      ? ` xaxis ${graphObject.axis.xAxis.log ? "log" : ""} ${
          graphObject.axis.xAxis.min ? `min ${graphObject.axis.xAxis.min}` : ""
        } ${
          graphObject.axis.xAxis.max ? `max ${graphObject.axis.xAxis.max}` : ""
        } \n`
      : " xaxis off\n"
  } ${
    graphObject.axis.yAxis.enabled
      ? ` yaxis ${graphObject.axis.yAxis.log ? "log" : ""} ${
          graphObject.axis.yAxis.min ? `min ${graphObject.axis.yAxis.min}` : ""
        } ${
          graphObject.axis.yAxis.max ? `max ${graphObject.axis.yAxis.max}` : ""
        } \n `
      : " yaxis off\n "
  }`;

  graphObject.dataSources.map((source) => {
    graphText += ` data ${source.fileName} ${source.name}=c${source.columnX}, c${source.columnY}\n`;
  });
  graphObject.displayElements.map((displayElement) => {
    console.log("DISPLAY", displayElement);
    if (displayElement.settings.type === "Line") {
      graphText += `${displayElement.name} ${
        displayElement.settings.line ? "line" : ""
      } ${
        displayElement.settings.marker
          ? `marker ${displayElement.settings.marker}`
          : ""
      } ${
        displayElement.settings?.color
          ? `color ${displayElement.settings?.color}`
          : ""
      } ${
        displayElement.settings?.style
          ? `lstyle ${displayElement.settings.style}`
          : ""
      } ${displayElement.settings?.smooth ? "smooth" : ""} ${
        displayElement.settings?.impulses ? "impulses" : ""
      } ${
        displayElement.settings?.deresolve
          ? `deresolve ${displayElement.settings.deresolve}`
          : ""
      } ${
        displayElement.settings?.key ? `key ${displayElement.settings.key}` : ""
      }`;
    }
    if (displayElement.settings.type === "Bar") {
      graphText += `  bar ${displayElement.name}   ${
        displayElement.settings?.color
          ? `color ${displayElement.settings?.color}`
          : ""
      } ${
        displayElement.settings?.width
          ? `width ${displayElement.settings.width}`
          : ""
      } ${
        displayElement.settings?.fill
          ? `fill ${displayElement.settings.fill}`
          : ""
      } `;
    }
  });
  graphText += `\n end graph`;

  // if (graphObject.settings?.type === "Line") {
  //   graphText += `begin graph\n  size ${graphObject.size.width} ${
  //     graphObject.size.height
  //   }\n  data ${graphObject.fileName} d${index + 1}=c${graphObject.columnX},c${
  //     graphObject.columnY
  //   }\n`;
  //   graphText += `  d${index + 1} ${graphObject.settings?.line ? "line" : ""} ${
  //     graphObject.settings?.marker
  //       ? `marker ${graphObject.settings?.marker}`
  //       : ""
  //   } ${
  //     graphObject.settings?.color ? `color ${graphObject.settings?.color}` : ""
  //   } ${
  //     graphObject.settings?.style ? `lstyle ${graphObject.settings.style}` : ""
  //   } ${graphObject.settings?.smooth ? "smooth" : ""} ${
  //     graphObject.settings?.impulses ? "impulses" : ""
  //   } ${
  //     graphObject.settings?.deresolve
  //       ? `deresolve ${graphObject.settings.deresolve}`
  //       : ""
  //   } ${graphObject.settings?.key ? `key ${graphObject.settings.key}` : ""}\n`;
  //   graphText += "end graph";
  // } else {
  //   graphText += `begin graph\n  size ${graphObject.size.width} ${
  //     graphObject.size.height
  //   }\n  data ${graphObject.fileName} d${index + 1}=c${graphObject.columnX},c${
  //     graphObject.columnY
  //   }\n`;
  //   graphText += `  bar d${index + 1}   ${
  //     graphObject.settings?.color ? `color ${graphObject.settings?.color}` : ""
  //   } ${
  //     graphObject.settings?.width ? `width ${graphObject.settings.width}` : ""
  //   } ${
  //     graphObject.settings?.fill ? `fill ${graphObject.settings.fill}` : ""
  //   }  \n`;
  //   graphText += "end graph";
  // }

  return graphText;
};

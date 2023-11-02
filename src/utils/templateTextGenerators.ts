import {
  cursorMovementType,
  singleGraphTemplate,
  textType,
} from "../../public/graphTemplate";

export const generateRenderObjectCode = (
  renderObject: singleGraphTemplate | cursorMovementType | textType,
  index: number
) => {
  let renderText = "";
  console.log(renderObject);
  switch (renderObject.type) {
    case "graph":
      renderText += `begin graph\n  size ${renderObject.size.width} ${
        renderObject.size.height
      }\n ${
        renderObject.axis.xAxis.enabled
          ? ` xaxis ${renderObject.axis.xAxis.log ? "log" : ""} ${
              renderObject.axis.xAxis.min
                ? `min ${renderObject.axis.xAxis.min}`
                : ""
            } ${
              renderObject.axis.xAxis.max
                ? `max ${renderObject.axis.xAxis.max}`
                : ""
            } \n`
          : " xaxis off\n"
      } ${
        renderObject.axis.yAxis.enabled
          ? ` yaxis ${renderObject.axis.yAxis.log ? "log" : ""} ${
              renderObject.axis.yAxis.min
                ? `min ${renderObject.axis.yAxis.min}`
                : ""
            } ${
              renderObject.axis.yAxis.max
                ? `max ${renderObject.axis.yAxis.max}`
                : ""
            } \n `
          : " yaxis off\n "
      }`;

      renderObject.dataSources.map((source) => {
        renderText += ` data ${source.fileName} ${source.name}=c${source.columnX}, c${source.columnY}\n`;
      });
      renderObject.displayElements.map((displayElement) => {
        console.log("DISPLAY", displayElement);
        if (displayElement.settings.type === "Line") {
          renderText += `${displayElement.name} ${
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
            displayElement.settings?.key
              ? `key ${displayElement.settings.key}`
              : ""
          }`;
        }
        if (displayElement.settings.type === "Bar") {
          renderText += `  bar ${displayElement.name}   ${
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
      renderText += `\n end graph`;
    case "cursor":
      renderText += `\namove ${(renderObject as cursorMovementType).x} ${
        (renderObject as cursorMovementType).y
      } \n`;
    case "text":
  }

  // if (renderObject.settings?.type === "Line") {
  //   renderText += `begin graph\n  size ${renderObject.size.width} ${
  //     renderObject.size.height
  //   }\n  data ${renderObject.fileName} d${index + 1}=c${renderObject.columnX},c${
  //     renderObject.columnY
  //   }\n`;
  //   renderText += `  d${index + 1} ${renderObject.settings?.line ? "line" : ""} ${
  //     renderObject.settings?.marker
  //       ? `marker ${renderObject.settings?.marker}`
  //       : ""
  //   } ${
  //     renderObject.settings?.color ? `color ${renderObject.settings?.color}` : ""
  //   } ${
  //     renderObject.settings?.style ? `lstyle ${renderObject.settings.style}` : ""
  //   } ${renderObject.settings?.smooth ? "smooth" : ""} ${
  //     renderObject.settings?.impulses ? "impulses" : ""
  //   } ${
  //     renderObject.settings?.deresolve
  //       ? `deresolve ${renderObject.settings.deresolve}`
  //       : ""
  //   } ${renderObject.settings?.key ? `key ${renderObject.settings.key}` : ""}\n`;
  //   renderText += "end graph";
  // } else {
  //   renderText += `begin graph\n  size ${renderObject.size.width} ${
  //     renderObject.size.height
  //   }\n  data ${renderObject.fileName} d${index + 1}=c${renderObject.columnX},c${
  //     renderObject.columnY
  //   }\n`;
  //   renderText += `  bar d${index + 1}   ${
  //     renderObject.settings?.color ? `color ${renderObject.settings?.color}` : ""
  //   } ${
  //     renderObject.settings?.width ? `width ${renderObject.settings.width}` : ""
  //   } ${
  //     renderObject.settings?.fill ? `fill ${renderObject.settings.fill}` : ""
  //   }  \n`;
  //   renderText += "end graph";
  // }

  return renderText;
};

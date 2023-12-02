import {
  cursorMovementType,
  singleGraphTemplate,
  textType,
} from "../../public/graphTemplate";

export const generateRenderObjectCode = (
  renderObject: singleGraphTemplate | cursorMovementType | textType
) => {
  let renderText = "";
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
        if (displayElement.settings.type === "Line") {
          renderText += `  ${displayElement.name} ${
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
      renderText += `\nend graph\n`;
      break;
    case "cursor":
      renderText += `\namove ${(renderObject as cursorMovementType).x} ${
        (renderObject as cursorMovementType).y
      } \n`;
      break;
    case "text":
      const textObject = renderObject as textType;
      renderText += `\nbegin key${textObject.nobox ? "" : "\nnobox"}\n offset ${
        textObject.offset.x
      } ${textObject.offset.y}\n ${
        textObject.color ? `color ${textObject.color}` : ""
      } hei ${textObject.height}\n text "${textObject.text}"\nend key\n`;
      break;
  }

  return renderText;
};

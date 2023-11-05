import { FunctionComponent } from "react";
import {
  singleGraphTemplate,
  cursorMovementType,
  textType,
} from "../../public/graphTemplate";
import GraphEditor from "./graphs/GraphEditor";
import CursorMove from "./CursorMove";
import TextEditor from "./TextEditor";

interface RenderObjectProps {
  renderItem: singleGraphTemplate | cursorMovementType | textType;
  itemUpdater: any;
  itemRemover: any;
  label: string;
}

const RenderObjectComponent: FunctionComponent<RenderObjectProps> = ({
  renderItem,
  itemUpdater,
  itemRemover,
  label,
}) => {
  const createRenderObject = (
    renderObject: singleGraphTemplate | cursorMovementType | textType
  ) => {
    switch (renderObject.type) {
      case "graph":
        return (
          <div>
            <GraphEditor
              graph={renderObject}
              graphSetter={itemUpdater}
              removeGraph={itemRemover}
              label={label}
            />
          </div>
        );
      case "cursor":
        return (
          <div>
            <CursorMove
              movement={renderObject}
              movementSetter={(movement) => itemUpdater(movement)}
            />
          </div>
        );
      case "text":
        return (
          <div>
            <TextEditor
              textData={renderObject}
              textSetter={(textData) => itemUpdater(textData)}
            />
          </div>
        );
    }
  };
  return <div>{createRenderObject(renderItem)}</div>;
};

export default RenderObjectComponent;

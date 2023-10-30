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
  graphSetter: any;
  graphRemover: any;
  cursorUpdater: any;
  label: string;
}

const RenderObjectComponent: FunctionComponent<RenderObjectProps> = ({
  renderItem,
  graphSetter,
  graphRemover,
  cursorUpdater,
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
              graphSetter={graphSetter}
              removeGraph={graphRemover}
              label={label}
            />
          </div>
        );
      case "cursor":
        return (
          <div>
            <CursorMove
              movement={renderObject}
              movementSetter={(movement) => cursorUpdater(movement)}
            />
          </div>
        );
      case "text":
        return (
          <div>
            <TextEditor textData={renderObject} />
          </div>
        );
    }
  };
  return <div>{createRenderObject(renderItem)}</div>;
};

export default RenderObjectComponent;

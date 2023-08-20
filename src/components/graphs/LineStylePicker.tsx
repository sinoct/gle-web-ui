import { FunctionComponent } from "react";

interface LineStylePickerProps {
  styleUpdater: any;
}

const LineStylePicker: FunctionComponent<LineStylePickerProps> = ({
  styleUpdater,
}) => {
  return (
    <label>
      Line style:
      <input type="number" min={0} max={10} onChange={styleUpdater} />
    </label>
  );
};

export default LineStylePicker;

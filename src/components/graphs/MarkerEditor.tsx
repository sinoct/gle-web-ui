import { FunctionComponent } from "react";
import markers from "@/app/types/lineParams/markers";
import Image from "next/image";

interface MarkerEditorProps {
  markerUpdater: any;
  selectedMarker: string;
}

const MarkerEditor: FunctionComponent<MarkerEditorProps> = ({
  markerUpdater,
  selectedMarker,
}) => {
  return (
    <label className="flex gap-4 items-center">
      Marker:
      <select name="markers" id="markerID" onChange={markerUpdater}>
        {markers.map((marker) => (
          <option key={marker} value={marker}>
            {marker}
          </option>
        ))}
      </select>
      {selectedMarker && (
        <Image
          width={32}
          height={32}
          src={`/assets/markers/${selectedMarker}.png`}
          alt=""
        />
      )}
    </label>
  );
};

export default MarkerEditor;

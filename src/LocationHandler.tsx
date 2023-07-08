import {Map} from "leaflet";
import {useMapEvents} from "react-leaflet";

export interface LocationHandlerProps {
  onChange: (map: Map) => void;
}

export function LocationHandler({onChange}: LocationHandlerProps) {
  useMapEvents({
    moveend: (e) => {
      onChange(e.target);
    }
  });
  return <></>;
}

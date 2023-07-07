import {MapContainer, Marker, TileLayer, Tooltip, useMapEvents} from "react-leaflet";
import {LatLng, latLng, Map} from "leaflet";
import {useEffect, useState} from "react";
import {DefaultIcon} from "./variables";
import {SimpleMarker} from "./types";

interface Props extends LocationHandlerProps {
  center: LatLng;
  markers: SimpleMarker[];
}

function MainMap({center, markers, onChange}: Props) {
  const [map, setMap] = useState<Map | null>(null);

  // first onChange Event when set map
  useEffect(() => {
    if(map) onChange(map);
  }, [map, onChange]);

  return (
    <MapContainer
      id='small-map'
      center={center}
      zoom={12}
      scrollWheelZoom={true}
      zoomControl={false}
      style={{width: "1280px", height: "960px"}}
      ref={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationHandler onChange={onChange} />
      {markers.map(marker => (
        <Marker position={latLng(marker.lat, marker.lng)} icon={DefaultIcon}>
          <Tooltip permanent>{marker.context}</Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}

interface LocationHandlerProps {
  onChange: (map: Map) => void;
}

function LocationHandler({onChange}: LocationHandlerProps) {
  useMapEvents({
    moveend: (e) => {
      onChange(e.target);
    }
  });
  return <></>;
}

export default MainMap;

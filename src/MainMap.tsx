import {MapContainer, Marker, TileLayer, Tooltip} from "react-leaflet";
import {LatLng, latLng, Map} from "leaflet";
import {useEffect, useState} from "react";
import {DefaultIcon} from "./variables";
import {SimpleMarker} from "./types";
import {LocationHandler, LocationHandlerProps} from "./LocationHandler";

interface Props extends LocationHandlerProps {
  center: LatLng;
  zoom: number;
  markers: SimpleMarker[];
}

function MainMap({center, zoom, markers, onChange}: Props) {
  const [map, setMap] = useState<Map | null>(null);

  // first onChange Event when set map
  useEffect(() => {
    if(map) onChange(map);
  }, [map, onChange]);

  // change zoom
  useEffect(() => {
    if(map) map.setZoom(zoom);
  }, [map, zoom])

  return (
    <MapContainer
      id='small-map'
      center={center}
      zoom={zoom}
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
          <Tooltip permanent direction='bottom'>{marker.context}</Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MainMap;

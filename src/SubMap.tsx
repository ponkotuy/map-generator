import {MapContainer, Rectangle, TileLayer} from "react-leaflet";
import {LatLng, LatLngBounds, Map} from "leaflet";
import {LocationHandler, LocationHandlerProps} from "./LocationHandler";
import {useEffect, useState} from "react";

interface Props extends LocationHandlerProps {
  center: LatLng;
  zoom: number;
  bounds: LatLngBounds | null;
}

function SubMap({center, zoom, bounds, onChange}: Props) {
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
      id='large-map'
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      zoomControl={false}
      style={{width: "480px", height: "320px"}}
      attributionControl={false}
      ref={setMap}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {bounds && <Rectangle bounds={bounds} />}
      <LocationHandler onChange={onChange} />
    </MapContainer>
  )
}

export default SubMap;

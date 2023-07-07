import {MapContainer, Rectangle, TileLayer} from "react-leaflet";
import {LatLng, LatLngBounds} from "leaflet";

interface Props {
  center: LatLng;
  bounds: LatLngBounds | null;
}

function SubMap({center, bounds}: Props) {
  return (
    <MapContainer
      id='large-map'
      center={center}
      zoom={8}
      scrollWheelZoom={true}
      zoomControl={false}
      style={{width: "480px", height: "320px"}}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {bounds && <Rectangle bounds={bounds} />}
    </MapContainer>
  )
}

export default SubMap;

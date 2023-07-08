import shadowMarkerIcon from "leaflet/dist/images/marker-shadow.png";
import {icon} from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";

export let DefaultIcon = icon({
  iconUrl: markerIcon,
  shadowUrl: shadowMarkerIcon,
  iconAnchor: [12, 40],
});

import {useState} from "react";
import {DomUtil, LatLng, latLng} from "leaflet";
import {SimpleMarker} from "./types";

interface Props {
  setPosition: (position: LatLng) => void;
  setMarkers: (markers: SimpleMarker[]) => void;
  getJson: () => any;
}

function Form({setPosition, setMarkers, getJson}: Props) {
  const [jsonValue, setJsonValue] = useState('');

  const loadJson = () => {
    const obj = JSON.parse(jsonValue)
    if(obj?.center?.lat && obj?.center?.lng) {
      setPosition(latLng(obj.center.lat, obj.center.lng));
    }
    if(obj?.markers) {
      setMarkers(obj.markers);
    }
  }

  const updateJson = () => {
    const json = JSON.stringify(getJson());
    setJsonValue(json);
  }

  return (
    <form>
      <label htmlFor='json'>State JSON</label>
      <textarea id='json' value={jsonValue} onChange={e => setJsonValue(e.target.value)} />
      <button type='button' onClick={loadJson}>Load JSON</button>
      <button type='button' onClick={updateJson}>Update Textarea JSON</button>
    </form>

  )
}

export default Form;

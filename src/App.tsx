import React, { useState } from 'react';
import './App.css';
import {latLng, LatLngBounds, Map} from "leaflet";
import 'leaflet/dist/leaflet.css';
import MainMap from "./MainMap";
import {SimpleMarker} from "./types";
import SubMap from "./SubMap";

function App() {
  const [position, setPosition] = useState(latLng(35.6809591, 139.7673068));
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);
  const [jsonValue, setJsonValue] = useState('');
  const [markers, setMarkers] = useState<SimpleMarker[]>([]);

  const changeMain = (map: Map) => {
    setBounds(map.getBounds());
    setPosition(map.getCenter());
  }

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
    const json = JSON.stringify({
      center: position,
      markers
    });
    setJsonValue(json);
  }

  return (
    <div className="App">
      <div className="Maps">
        <MainMap center={position} markers={markers} onChange={changeMain} />
        <SubMap center={position} bounds={bounds} />
      </div>
      <form>
        <label htmlFor='json'>State JSON</label>
        <textarea id='json' value={jsonValue} onChange={e => setJsonValue(e.target.value)} />
        <button type='button' onClick={loadJson}>Load JSON</button>
        <button type='button' onClick={updateJson}>Update Textarea JSON</button>
      </form>
    </div>
  );
}

export default App;

import React, {useState} from 'react';
import './App.css';
import {latLng, LatLngBounds, Map} from "leaflet";
import 'leaflet/dist/leaflet.css';
import MainMap from "./MainMap";
import {SimpleMarker} from "./types";
import SubMap from "./SubMap";
import Form from "./Form";

function App() {
  const [position, setPosition] = useState(latLng(35.6809591, 139.7673068));
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);
  const [markers, setMarkers] = useState<SimpleMarker[]>([]);

  const getJson = () => {
    return {
      center: position,
      markers
    };
  }

  const changeMain = (map: Map) => {
    setBounds(map.getBounds());
    setPosition(map.getCenter());
  }

  return (
    <div className="App">
      <div className="Maps">
        <MainMap center={position} markers={markers} onChange={changeMain} />
        <SubMap center={position} bounds={bounds} />
      </div>
      <Form setPosition={setPosition} setMarkers={setMarkers} getJson={getJson} />
    </div>
  );
}

export default App;

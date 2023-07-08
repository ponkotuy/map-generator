import React, {useState} from 'react';
import './App.css';
import {latLng, LatLngBounds, Map} from "leaflet";
import 'leaflet/dist/leaflet.css';
import MainMap from "./MainMap";
import {SimpleMarker} from "./types";
import SubMap from "./SubMap";
import Form from "./Form";
import {Typography} from "@mui/material";

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
      <Typography variant="h2" align="center" mt={4}>Map Generator</Typography>
      <Typography variant="h6" align="right" mr={8}>by @ponkotuy@social.mikutter.hachune.net</Typography>
      <div className="Maps">
        <MainMap center={position} markers={markers} onChange={changeMain} />
        <SubMap center={position} bounds={bounds} />
      </div>
      <Form setPosition={setPosition} setMarkers={setMarkers} getJson={getJson} />
    </div>
  );
}

export default App;

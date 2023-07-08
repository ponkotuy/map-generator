import React, {useState} from 'react';
import './App.css';
import {latLng, LatLngBounds, Map} from "leaflet";
import 'leaflet/dist/leaflet.css';
import MainMap from "./MainMap";
import {SimpleMarker} from "./types";
import SubMap from "./SubMap";
import Form from "./Form";
import {Link, Typography} from "@mui/material";

function App() {
  const [position, setPosition] = useState(latLng(35.6809591, 139.7673068));
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);
  const [markers, setMarkers] = useState<SimpleMarker[]>([]);
  const [mainZoom, setMainZoom] = useState<number>(12);
  const [subZoom, setSubZoom] = useState<number>(8)

  const getJson = () => {
    return {
      center: position,
      mainZoom,
      subZoom,
      markers
    };
  }

  const changeMain = (map: Map) => {
    setBounds(map.getBounds());
    setPosition(map.getCenter());
    setMainZoom(map.getZoom());
  }

  const changeSub = (map: Map) => {
    setSubZoom(map.getZoom());
  }

  const setZooms = (main: number, sub: number) => {
    setMainZoom(main);
    setSubZoom(sub);
  }

  return <>
    <title>Map Generator</title>
    <div className="App">
      <Typography variant="h2" align="center" mt={4}>Map Generator</Typography>
      <Typography variant="h6" align="right" mr={8}>by
        <Link href="https://social.mikutter.hachune.net/@ponkotuy">@ponkotuy@social.mikutter.hachune.net</Link>
      </Typography>
      <div className="Maps">
        <MainMap center={position} markers={markers} onChange={changeMain} zoom={mainZoom} />
        <SubMap center={position} bounds={bounds} onChange={changeSub} zoom={subZoom} />
      </div>
      <Form setPosition={setPosition} setMarkers={setMarkers} setZooms={setZooms} getJson={getJson} />
    </div>
  </>;
}

export default App;

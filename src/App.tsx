import React, { useEffect, useState } from 'react';
import './App.css';
import { MapContainer, Marker, Rectangle, TileLayer, Tooltip, useMapEvents } from "react-leaflet";
import { LatLng, latLng, Map, icon } from "leaflet";
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import shadowMarkerIcon from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = icon({iconUrl: markerIcon, shadowUrl: shadowMarkerIcon});

interface LocationHandlerProps {
  onChange: (latLng: LatLng) => void;
}

function LocationHandler({onChange}: LocationHandlerProps) {
  useMapEvents({
    moveend: (e) => {
      onChange(e.target.getCenter());
    }
  });
  return <></>;
}

function App() {
  const [position, setPosition] = useState(latLng(35.6809591, 139.7673068));
  const [smallMap, setSmallMap] = useState<Map | null>(null);
  const [largeMap, setLargeMap] = useState<Map | null>(null);

  useEffect(() => {
    largeMap?.flyTo(position);
  }, [largeMap, position])

  return (
    <div className="App">
      <MapContainer
        id='small-map'
        center={position}
        zoom={12}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{width: "1280px", height: "960px"}}
        ref={setSmallMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationHandler onChange={setPosition} />
        <Marker position={position} icon={DefaultIcon}>
          <Tooltip permanent>Tokyo station</Tooltip>
        </Marker>
      </MapContainer>
      <MapContainer
        id='large-map'
        center={position}
        zoom={8}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{width: "480px", height: "320px"}}
        ref={setLargeMap}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {smallMap && <Rectangle bounds={smallMap.getBounds()} />}
      </MapContainer>
    </div>
  );
}

export default App;

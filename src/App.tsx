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

interface SimpleMarker {
  lat: number;
  lng: number;
  context: string;
}

function App() {
  const [position, setPosition] = useState(latLng(35.6809591, 139.7673068));
  const [smallMap, setSmallMap] = useState<Map | null>(null);
  const [largeMap, setLargeMap] = useState<Map | null>(null);
  const [jsonValue, setJsonValue] = useState('');
  const [markers, setMarkers] = useState<SimpleMarker[]>([]);

  useEffect(() => {
    largeMap?.flyTo(position);
  }, [largeMap, position]);

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
        {markers.map(marker => (
          <Marker position={latLng(marker.lat, marker.lng)} icon={DefaultIcon}>
            <Tooltip permanent>{marker.context}</Tooltip>
          </Marker>
        ))}
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

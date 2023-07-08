import React, {useState} from "react";
import {LatLng, latLng} from "leaflet";
import {SimpleMarker} from "./types";
import {Button, ButtonGroup, Stack, TextField, Typography} from "@mui/material";
import {DeleteForeverRounded} from "@mui/icons-material";

interface Props {
  setPosition: (position: LatLng) => void;
  setMarkers: (markers: SimpleMarker[]) => void;
  setZooms: (main: number, sub: number) => void;
  getJson: () => any;
}

interface TempSimpleMarker {
  lat?: string;
  lng?: string;
  context?: string;
}

type MarkerLabel = "lat" | "lng" | "context";

function Form({setPosition, setMarkers, setZooms, getJson}: Props) {
  const [jsonValue, setJsonValue] = useState("");
  const [tempMarkers, setTempMarkers] = useState<TempSimpleMarker[]>([]);

  const loadJson = () => {
    const obj = JSON.parse(jsonValue)
    if(obj?.center?.lat && obj?.center?.lng) {
      setPosition(latLng(obj.center.lat, obj.center.lng));
    }
    if(obj?.markers) {
      setMarkers(obj.markers);
      const temps = obj.markers.map((marker: SimpleMarker) => (
        {lat: marker.lat.toString(), lng: marker.lng.toString(), context: marker.context}
      ));
      setTempMarkers(temps);
    }
    if(obj?.mainZoom && obj?.subZoom) {
      setZooms(obj.mainZoom, obj.subZoom);
    }
  }

  const updateJson = () => {
    const json = JSON.stringify(getJson());
    setJsonValue(json);
  }

  const addMarker = () => {
    setTempMarkers(tempMarkers.concat({}));
  }

  const changeMarkerInput = (index: number, label: MarkerLabel) => {
    return ((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      tempMarkers[index][label] = e.target.value;
      setTempMarkers(tempMarkers);
    })
  }

  const deleteMarker = (index: number) => {
    return () => {
      tempMarkers.splice(index, 1);
      setTempMarkers(tempMarkers);
      updateMarkers();
    }
  }

  const updateMarkers = () => {
    const markers =
      tempMarkers.map(marker =>
        (marker.lat && marker.lng && marker.context) ? {lat: parseFloat(marker.lat), lng: parseFloat(marker.lng), context: marker.context} : null
      ).filter((item): item is NonNullable<typeof item> => item != null)
    setMarkers(markers)
  }

  return (
    <form className="MapForm">
      <Stack spacing={4} mt={2}>
        <Stack spacing={2}>
          <Typography variant="h5">Markers</Typography>
          {tempMarkers.map((marker, index) => (
            <Stack direction="row" spacing={2} key={index}>
              <TextField
                key={"lat" + marker?.context}
                variant="standard"
                label="latitude"
                type="text"
                defaultValue={marker?.lat}
                onChange={changeMarkerInput(index, "lat")}
              />
              <TextField
                key={"lng" + marker?.context}
                variant="standard"
                label="longitude"
                type="text"
                defaultValue={marker?.lng}
                onChange={changeMarkerInput(index, "lng")}
              />
              <TextField
                key={"context" + marker?.context}
                variant="standard"
                label="context"
                type="text"
                fullWidth
                defaultValue={marker?.context}
                onBlur={changeMarkerInput(index, "context")}
              />
              <Button type="button" variant="outlined" color="error" onClick={deleteMarker(index)}>
                <DeleteForeverRounded />
              </Button>
            </Stack>
          ))}
          <Stack direction="row" spacing={1} justifyContent="center">
            <Button type="button" onClick={addMarker} variant="outlined" color="secondary">Add Marker</Button>
            <Button type="button" onClick={updateMarkers} variant="contained">Set</Button>
          </Stack>
        </Stack>
        <Stack spacing={2}>
          <Typography variant="h5">JSON</Typography>
          <div>
            <TextField
              id="json"
              label="json value"
              value={jsonValue}
              multiline fullWidth
              variant="standard"
              onChange={e => setJsonValue(e.target.value)}
            />
          </div>
          <div>
            <ButtonGroup variant="outlined" aria-label="JSON button">
              <Button type="button" onClick={loadJson} variant="outlined">Load JSON</Button>
              <Button type="button" onClick={updateJson} variant="outlined">Update Textarea JSON</Button>
            </ButtonGroup>
          </div>
        </Stack>
      </Stack>
    </form>

  )
}

export default Form;

import {useState} from "react";
import {LatLng, latLng} from "leaflet";
import {SimpleMarker} from "./types";
import {Button, ButtonGroup, Grid, InputLabel, Stack, TextField, Typography} from "@mui/material";

interface Props {
  setPosition: (position: LatLng) => void;
  setMarkers: (markers: SimpleMarker[]) => void;
  getJson: () => any;
}

function Form({setPosition, setMarkers, getJson}: Props) {
  const [jsonValue, setJsonValue] = useState("");

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
    <form className="MapForm">
      <Stack spacing={2} mt={2}>
        <Typography variant="h5">JSON</Typography>
        <div>
          <TextField
            id="json"
            value={jsonValue}
            multiline fullWidth
            variant="standard"
            onChange={e => setJsonValue(e.target.value)}
          />
        </div>
        <div>
          <ButtonGroup variant="contained" aria-label="JSON button">
            <Button type="button" onClick={loadJson} variant="outlined">Load JSON</Button>
            <Button type="button" onClick={updateJson} variant="outlined">Update Textarea JSON</Button>
          </ButtonGroup>
        </div>
      </Stack>
    </form>

  )
}

export default Form;

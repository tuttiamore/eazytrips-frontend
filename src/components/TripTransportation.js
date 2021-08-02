import { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import { sizing } from "@material-ui/system";

import { useTripContext } from "../context/TripContext";
import useTripTransportationStyle from "../styles/useTripTransportationStyle";
import { DirectionsCar } from "@material-ui/icons";

export default function TripTransportation() {
  const { tripDataRaw, setTripDataRaw } = useTripContext();
  const [transport, setTransport] = useState("");
  const classes = useTripTransportationStyle();

  return (
    <>
      <Box mt={1} mb={4}>
        <Typography variant="h5" component="p" color="primary" gutterBottom>
          Preferred transportation
        </Typography>
        <Typography
          variant="body2"
          component="p"
          color="textPrimary"
          gutterBottom
        >
          How do you want to move between sights?
        </Typography>
      </Box>
      <Box mt={1} mb={4} display="flex" justifyContent="center">
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={transport}
          onChange={(event) => {
            setTransport(event.target.value);
            setTripDataRaw({
              ...tripDataRaw,
              transportation: { [event.target.value]: true },
            });
          }}
          className={classes.selectField}
          variant="outlined"
        >
          <MenuItem value={"walking"}>
            <DirectionsWalkIcon
              className={classes.selectIcon}
            ></DirectionsWalkIcon>
            Walking
          </MenuItem>
          <MenuItem value={"cycling"}>
            <DirectionsBikeIcon
              className={classes.selectIcon}
            ></DirectionsBikeIcon>
            Cycling
          </MenuItem>
          <MenuItem value={"public"}>
            <DirectionsCarIcon
              className={classes.selectIcon}
            ></DirectionsCarIcon>
            Car
          </MenuItem>
        </Select>
      </Box>
    </>
  );
}

{
  /* <Grid item align="left">
<Typography variant="h5" component="p" color="textPrimary">
  Preferred transportation
</Typography>
</Grid>
<Grid
item
xs
className={classes.chipAlignSelf}
container
direction="row"
>
<FormGroup>
  <FormControlLabel
    control={
      <Switch
        checked={tripUserInput.walking}
        onChange={handleSwitchChange}
        name="walking"
        value={tripUserInput.walking}
      />
    }
    label={
      <Box display="flex" direction="row">
        <Typography align="bottom">Walking</Typography>
        <DirectionsWalkIcon />
      </Box>
    }
  />
  <FormControlLabel
    control={
      <Switch
        checked={tripUserInput.public}
        onChange={handleSwitchChange}
        name="public"
        value={tripUserInput.public}
      />
    }
    label={
      <Box display="flex" direction="row">
        <Typography align="bottom">Public transport</Typography>
        <DriveEtaIcon />
      </Box>
    }
  />
</FormGroup>
</Grid> */
}

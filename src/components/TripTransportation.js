import { useState } from "react";

import { Box, Typography, Select, MenuItem } from "@material-ui/core";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";

import { useTripContext } from "../context/TripContext";

import useTripTransportationStyle from "../styles/useTripTransportationStyle";

export default function TripTransportation() {
  const { tripDataRaw, setTripDataRaw } = useTripContext();
  const [transport, setTransport] = useState("walking");
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

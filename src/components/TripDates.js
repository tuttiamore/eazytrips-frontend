import { useState } from "react";

import { Box, TextField, Typography } from "@material-ui/core";

import { useTripContext } from "../context/TripContext";
import useTripDatesStyle from "../styles/useTripPlanerWrapperStyle";

// GET PICTURES HERE :https://api.teleport.org/api/urban_areas/slug:berlin/images

export default function TripDates() {
  const { tripDataRaw, setTripDataRaw } = useTripContext();

  const [tripUserInput, setTripUserInput] = useState({});

  const classes = useTripDatesStyle();

  const handleChange = (event) => {
    setTripDataRaw({
      ...tripDataRaw,
      [event.target.name]: event.target.value,
    });
    setTripUserInput({
      ...tripUserInput,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Box mt={1} mb={4}>
        <Typography variant="h5" component="p" color="primary" gutterBottom>
          Travel dates
        </Typography>
        <Typography
          variant="body2"
          component="p"
          color="textPrimary"
          gutterBottom
        >
          When do you want to start sightseeing?
        </Typography>
        <TextField
          id="tripStarts"
          type="datetime-local"
          label="Date and time"
          defaultValue="2017-05-24"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          name="tripStarts"
          onChange={handleChange}
          value={tripUserInput.tripStarts}
          required
        />
      </Box>
      <Box mt={1} mb={1}>
        <Typography
          variant="body2"
          component="p"
          color="textPrimary"
          gutterBottom
        >
          When do you want to finish sightseeing?
        </Typography>
        <TextField
          id="tripEnds"
          label="Date and time"
          type="datetime-local"
          defaultValue="2017-05-24"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          name="tripEnds"
          onChange={handleChange}
          value={tripUserInput.tripEnds}
          required
        />
      </Box>
    </>
  );
}

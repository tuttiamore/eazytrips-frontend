import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import DriveEtaIcon from "@material-ui/icons/DriveEta";

import {
  FormControlLabel,
  FormGroup,
  Divider,
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Switch,
} from "@material-ui/core";

import useEnterDestinationStyle from "../styles/useEnterDestinationStyle";
import { useTripContext } from "../context/TripContext";

export default function EnterDestinationPage() {
  const [tripUserInput, setTripUserInput] = useState({
    public: false,
    walking: false,
    accommodation: "",
  });

  const { setTripDataRaw } = useTripContext();
  const classes = useEnterDestinationStyle();
  const history = useHistory();

  const handleChange = (event) => {
    setTripUserInput({
      ...tripUserInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleSwitchChange = (event) => {
    setTripUserInput({
      ...tripUserInput,
      [event.target.name]: !tripUserInput[String(event.target.name)],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // build the request object
    const req = {
      destination: tripUserInput.destination,
      tripName: `Trip to ${tripUserInput.destination}`,
      tripStarts: tripUserInput.tripStarts,
      tripEnds: tripUserInput.tripEnds,
      accommodation: tripUserInput.accommodation,
      transportation: {
        walking: tripUserInput.walking,
        public: tripUserInput.public,
      },
    };

    //fetch sight suggestions for destination and store them in context

    try {
      const { data } = await axios.post(
        "https://eazytrips-backend.herokuapp.com/gettrip",
        req
      );
      console.log(data);
      setTripDataRaw(data);
      history.push("/suggestedplaces");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          spacing={4}
          p={3}
        >
          <Grid item xs={12} m={3} align="left">
            <Typography
              variant="h5"
              component="p"
              color="textPrimary"
              gutterBottom
            >
              Destination
            </Typography>
            <Typography
              variant="body"
              component="p"
              color="textPrimary"
              gutterBottom
            >
              Where do you want to go?
            </Typography>
            <TextField
              fullWidth
              id="destination"
              label="e.g. Barcelona"
              variant="filled"
              name="destination"
              onChange={handleChange}
              value={tripUserInput.destination}
              required
              margin="normal"
            />
          </Grid>

          <Divider />

          <Grid item align="left">
            <Typography
              variant="h5"
              component="p"
              color="textPrimary"
              gutterBottom
            >
              Travel dates
            </Typography>
            <Typography
              variant="body"
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
          </Grid>

          <Grid item align="left">
            <Typography
              variant="body"
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
          </Grid>

          <Divider />

          <Grid item align="left">
            <Typography
              variant="h5"
              component="p"
              color="textPrimary"
              gutterBottom
            >
              Accommodation
            </Typography>
            <Typography
              variant="body"
              component="p"
              color="textPrimary"
              gutterBottom
            >
              Where are you staying?
            </Typography>
            <TextField
              fullWidth
              id="accommodation"
              label="e.g. Calla Barca 124, Barcelona"
              variant="filled"
              name="accommodation"
              onChange={handleChange}
              value={tripUserInput.accommodation}
              margin="normal"
            />
          </Grid>

          <Divider />

          <Grid item align="left">
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
          </Grid>

          <Grid
            item
            alignItems="center"
            className={classes.chipAlignSelf}
          ></Grid>

          <Grid item align="right">
            <Button variant="contained" color="primary" type="submit">
              SKIP/NEXT
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

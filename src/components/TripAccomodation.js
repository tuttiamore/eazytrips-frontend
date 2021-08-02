import { Box, Typography } from "@material-ui/core";

import AutocompletePlaces from "./AutocompletePlaces";

export default function TripAccomodation() {
  return (
    <>
      <Box mt={1} mb={4}>
        <Typography variant="h5" component="p" color="primary" gutterBottom>
          Accommodation
        </Typography>
        <Typography
          variant="body2"
          component="p"
          color="textPrimary"
          gutterBottom
        >
          Where are you staying?
        </Typography>
      </Box>
      <Box mt={1} mb={4}>
        <AutocompletePlaces
          nextPath="/plantrip/transport"
          isSearchIcon={false}
          variant="outlined"
        ></AutocompletePlaces>
      </Box>
    </>
  );
}

/* <Grid item align="left">
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

          <Grid item className={classes.chipAlignSelf}></Grid>

          <Grid item align="right">
            <Button variant="contained" color="primary" type="submit">
              SKIP/NEXT
            </Button>
          </Grid>
        </Grid> */

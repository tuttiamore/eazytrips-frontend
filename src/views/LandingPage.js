import React from "react";
import Fab from "@material-ui/core/Fab";
import useLandingPageButtonStyle from "../styles/useLandingPageButtonStyle";
import { useTheme } from "@material-ui/core/styles";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import Grid from "@material-ui/core/Grid";
import Card from "../components/Card";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
//import Box from "@material-ui/core/Box";
//import { sizing } from "@material-ui/system";

export default function LandingPage() {
  const theme = useTheme();
  console.log(theme);
  const classes = { useLandingPageButtonStyle };

  const history = useHistory();

  const handleClick = (path) => {
    console.log(path);
    history.push(path);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      spacing={3}
      className={classes.container}
    >
      <Grid item align="left">
        <Typography variant="h5" component="p" color="textSecondary">
          Getting Started
        </Typography>
      </Grid>

      <Grid item align="center">
        <Fab
          variant="extended"
          size="large"
          color="primary"
          aria-label="add"
          className={classes.margin}
          onClick={() => handleClick("/plantrip")}
        >
          <CardTravelIcon className={classes.extendedIcon} />
          Plan a trip
        </Fab>
      </Grid>

      <Grid item align="center">
        <Fab
          variant="extended"
          size="large"
          color="primary"
          aria-label="add"
          className={classes.margin}
          onClick={() => handleClick("/tripsummary")}
        >
          <BookmarkBorderIcon />
          Saved trips
        </Fab>
      </Grid>

      <Grid item align="left">
        <Typography variant="h5" component="p" color="textSecondary">
          Upcoming trips
        </Typography>
      </Grid>

      <Card type="UpcomingTrip" data={"Berlin"} />
    </Grid>
  );
}

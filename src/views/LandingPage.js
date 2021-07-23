import React from "react";
import Fab from "@material-ui/core/Fab";
import useLandingPageButtonStyle from "../styles/useLandingPageButtonStyle";
import { useTheme } from "@material-ui/core/styles";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import Grid from "@material-ui/core/Grid";
import Card from "../components/Card";
import { useHistory } from "react-router-dom";

export default function LandingPage() {
  const theme = useTheme();
  const classes = { useLandingPageButtonStyle };

  const history = useHistory();

  const handleClick = (e, ev) => {
    console.log(e);
    history.push(e);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <Grid item xs>
        <Fab
          variant="extended"
          size="large"
          color="primary"
          aria-label="add"
          className={classes.margin}
          onClick={() => handleClick("/Plan-a-trip")}
        >
          <CardTravelIcon className={classes.extendedIcon} />
          Plan a trip
        </Fab>
      </Grid>

      <Grid item xs>
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
      <Card type="UpcomingTrip" data={"Berlin"} />
    </Grid>
  );
}

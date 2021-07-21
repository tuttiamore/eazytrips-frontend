import React from "react";
import Fab from '@material-ui/core/Fab';
import useLandingPageButtonStyle from "../styles/useLandingPageButtonStyle";
import { useTheme } from "@material-ui/core/styles";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import Grid from '@material-ui/core/Grid';


export default function LandingPage() {
  const theme = useTheme();
  const classes = { useLandingPageButtonStyle };

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
          size="small"
          color="primary"
          aria-label="add"
          className={classes.margin}

        >
          <CardTravelIcon className={classes.extendedIcon} />
          PLAN A TRIP
        </Fab>
      </Grid>

      <Grid item xs>
        <Fab
          variant="extended"
          size="small"
          color="primary"
          aria-label="add" className={classes.margin}
        >
          <BookmarkBorderIcon />
          SAVED TRIPS
        </Fab>
      </Grid>
    </Grid>
  );
}


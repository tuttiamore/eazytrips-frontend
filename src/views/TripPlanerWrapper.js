import React from "react";
import { useParams } from "react-router";

import { Box, Typography } from "@material-ui/core";

import BottomNavTrip from "../components/BottomNavTrip";

import { useTripContext } from "../context/TripContext";
import TripDates from "../components/TripDates";
import TripAccomodation from "../components/TripAccomodation";
import TripTransportation from "../components/TripTransportation";
import TripSuggestions from "../components/TripSuggestions";

import useTripPlanerWrapperStyle from "../styles/useTripPlanerWrapperStyle";

export default function TripPlanerWrapper() {
  const { tripDataRaw } = useTripContext();
  const { stage } = useParams();
  const classes = useTripPlanerWrapperStyle();

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        bgcolor="primary.main"
        className={classes.headerWrapper}
      >
        <Box
          className={classes.headingContainer}
          id="heading-container"
          component="section"
          //   bgcolor="primary.main"
          width="100%"
          padding={3}
          boxSizing="border-box"
        >
          <Typography
            variant="h5"
            component="p"
            color="textSecondary"
            className={classes.cityHeading}
          >
            Your trip to
          </Typography>
          <Typography
            variant="h2"
            component="p"
            className={classes.cityHeading}
          >
            {tripDataRaw.destination}
          </Typography>
        </Box>

        <Box p={3} mt={5} bgcolor="white" className={classes.contentWrapper}>
          {stage === "tripdates" && <TripDates></TripDates>}
          {stage === "accommodation" && <TripAccomodation></TripAccomodation>}
          {stage === "transportation" && (
            <TripTransportation></TripTransportation>
          )}
          {stage === "suggestions" && <TripSuggestions></TripSuggestions>}
        </Box>
      </Box>
    </>
  );
}
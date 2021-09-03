import React, { Fragment } from "react";
import { useParams } from "react-router-dom";

import { List, Box, Typography, Divider } from "@material-ui/core/";
import Card from "../components/Card";

import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";

import useCardStyle from "../styles/useCardStyle";

import { useTripContext } from "../context/TripContext";

export default function TripSingleDay() {
  const { tripData } = useTripContext();

  const { day } = useParams();

  const morning = tripData.trip[day - 1].locations.filter(
    (element) => element.period === "morning"
  );

  const afternoon = tripData.trip[day - 1].locations.filter(
    (element) => element.period === "afternoon"
  );

  const classes = useCardStyle();

  if (morning.length === 0 && afternoon.length === 0) {
    return (
      <Typography variant="body2" component="p">
        Your arrival or departure time does not allow for any sightseeing at
        this day
      </Typography>
    );
  }

  return (
    <List>
      {morning.length !== 0 && (
        <Box my={3}>
          <Typography variant="h6" align="center">
            Suggested sights: Morning
          </Typography>
        </Box>
      )}
      <Card type={"Accommodation"} data={"Hotel"} />
      {morning.length !== 0 &&
        morning.map((location, index) => (
          <Fragment key={index}>
            <div className={classes.div}>
              <span className={classes.span} />
              <Typography className={classes.distance} variant="body1">
                {Math.round(location.travelTo / 60)} min
              </Typography>
              {tripData.transportation.public ? (
                <DriveEtaIcon fontSize="large" />
              ) : tripData.transportation.cycling ? (
                <DirectionsBikeIcon fontSize="large" />
              ) : (
                <DirectionsWalkIcon fontSize="large" />
              )}
            </div>
            <Card type="TripSingleDay" data={location} />
          </Fragment>
        ))}
      <Divider className={classes.divide} />
      {afternoon.length !== 0 && (
        <Box my={3}>
          <Typography variant="h6" align="center">
            Suggested sights: Afternoon
          </Typography>
        </Box>
      )}
      {afternoon.length !== 0 &&
        afternoon.map((location, index) => (
          <Fragment key={index}>
            <div className={classes.div}>
              <span className={classes.span} />
              <Typography className={classes.distance} variant="body1">
                {Math.round(location.travelTo / 60)} min
              </Typography>
              {tripData.transportation.public ? (
                <DriveEtaIcon fontSize="large" />
              ) : tripData.transportation.cycling ? (
                <DirectionsBikeIcon fontSize="large" />
              ) : (
                <DirectionsWalkIcon fontSize="large" />
              )}
            </div>
            <Card type="TripSingleDay" data={location} />
          </Fragment>
        ))}
    </List>
  );
}

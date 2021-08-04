import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { List } from "@material-ui/core/";
import Card from "../components/Card";
//import mockData from "../dataFranz/mockBackend.json";
import useCardStyle from "../styles/useCardStyle";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import Typography from "@material-ui/core/Typography";
import { useTripContext } from "../context/TripContext";

export default function TripSingleDay() {
  const { tripData } = useTripContext();

  const { day } = useParams();
  const classes = useCardStyle();

  return (
    <List>
      <Card type={"Accommodation"} data={"Hotel"} />
      {tripData.trip[day - 1].locations.map((element, index) => (
        <Fragment key={index}>
          <div className={classes.div}>
            <span className={classes.span} />
            <Typography className={classes.distance} variant="body1">
              {Math.round(
                tripData.trip[day - 1].locations[index].travelTo / 60
              )}{" "}
              min
            </Typography>
            {tripData.transportation.public ? (
              <DriveEtaIcon fontSize="large" />
            ) : tripData.transportation.cycling ? (
              <DirectionsBikeIcon fontSize="large" />
            ) : (
              <DirectionsWalkIcon fontSize="large" />
            )}
          </div>
          <Card type="TripSingleDay" data={element} />
        </Fragment>
      ))}
    </List>
  );
}

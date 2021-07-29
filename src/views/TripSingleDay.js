import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { List } from "@material-ui/core/";
import Card from "../components/Card";
import mockData from "../dataFranz/mockBerlin.json";
import NavStepper from "../components/Stepper";
import useCardStyle from "../styles/useCardStyle";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import Typography from "@material-ui/core/Typography";
import { useTripContext } from "../context/TripContext";
import Map from "../components/Map";

export default function TripSingleDay() {
  const { tripData } = useTripContext();
  // const tripData = mockData;
  const { day } = useParams();
  // console.log(tripData);
  const classes = useCardStyle();

  return (
    <>
      <NavStepper></NavStepper>

      <List
        style={{
          height: "100%",
          overflow: "auto",
          padding: "8px",
          width: "80%",
          margin: "auto",
        }}
      >
        {tripData.trip[day - 1].locations.map((element, index) => (
          <Fragment key={index}>
            <Card type="TripSingleDay" data={element} />
            {tripData.trip[day - 1].locations[index + 1] && (
              <div className={classes.div}>
                <span className={classes.span} />
                <Typography className={classes.distance} variant="body1">
                  {tripData.trip[day - 1].locations[index].travelTo} min
                </Typography>
                <DirectionsWalkIcon fontSize="large" />
              </div>
            )}
          </Fragment>
        ))}
      </List>
      <Map key="1" type="SingleDay" />
    </>
  );
}

import React from "react";
import List from "@material-ui/core/List";
import Card from "../components/Card";
import mockData from "../mock.json";
import NavStepper from "../components/Stepper";

export default function TripSingleDay() {
  const tripData = mockData;
  //console.log(tripData);

  return (
    <>
      <NavStepper></NavStepper>

      <List style={{ height: "100%", overflow: "auto" }}>
        {tripData.trip[0].locations.map((element) => (
          <Card
            key={element.locationIndex}
            type="TripSingleDay"
            data={element}
          />
        ))}
      </List>
    </>
  );
}

import React from "react";
<<<<<<< HEAD
import NavStepper from "../components/Stepper";

export default function TripSingleDay() {
  return (
    <div>
      <NavStepper></NavStepper>
    </div>
=======
import List from "@material-ui/core/List";
import Card from "../components/Card";
import mockData from "../mock.json";

export default function TripSingleDay() {
  const tripData = mockData;
  //console.log(tripData);

  return (
    <>
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
>>>>>>> 802a2506073d7e70301018b743698a56be1d11fe
  );
}

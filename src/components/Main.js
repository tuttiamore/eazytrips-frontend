import React from "react";
import { useTripContext } from "../context/TripContext";
import TripSingleday from "../views/TripSingleDay";
import mockData from "../mock.json";

import Container from "@material-ui/core/Container";
export default function Main() {
  const { tripData } = useTripContext();

  return <div>{tripData}</div>;
}

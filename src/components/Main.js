import React from "react";
import { useTripContext } from "../context/TripContext";

export default function Main() {
  const { tripData } = useTripContext();
  return <div>{tripData}</div>;
}

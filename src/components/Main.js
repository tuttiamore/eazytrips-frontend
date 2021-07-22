import React from "react";
import { useTripContext } from "../context/TripContext";
import LandingPage from "../views/LandingPage";

export default function Main() {
  const { tripData } = useTripContext();
  return (
    <>
      <div>{tripData}</div>
      <br />
      {/* <LandingPage /> */}
    </>
  );
}

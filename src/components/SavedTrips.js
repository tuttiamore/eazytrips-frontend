import React from "react";
import { useTripContext } from "../context/TripContext";

export default function SavedTrips({ me }) {
  const { savedTrips } = useTripContext();
  console.log(me);
  console.log(savedTrips);
  return <div>bla</div>;
}

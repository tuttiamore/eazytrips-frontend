import React from "react";
import { useTripContext } from "../context/TripContext";

export default function Main({ children }) {
  const { tripData } = useTripContext();
  return <main>{children}</main>;
}

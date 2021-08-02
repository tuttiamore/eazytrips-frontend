import React from "react";
//import { useTripContext } from "../context/TripContext";
import Box from "@material-ui/core/Grid";
import useAppGridStyle from "../styles/useAppGridStyle";

export default function Main({ children }) {
  const classes = useAppGridStyle();

  //const { tripData } = useTripContext();
  return <Box className={classes.main}>{children}</Box>;
}

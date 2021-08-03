import React from "react";

import { Box, Typography } from "@material-ui/core";
import Map from "../components/Map";
import NavStepper from "../components/Stepper";
import DrawerCustom from "../components/DrawerCustom";

import useTripResultsWrapperStyle from "../styles/useTripResultsWrapperStyle";
export default function TripResultsWrapper({ children }) {
  const classes = useTripResultsWrapperStyle();

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        bgcolor="primary.main"
        className={classes.headerWrapper}
      >
        <Box
          className={classes.MapContainer}
          id="heading-container"
          component="section"
          //   bgcolor="primary.main"
          width="100%"
          boxSizing="border-box"
        >
          <Map type="TripSummary" />
        </Box>

        <DrawerCustom heading="Trip Summary">
          <Box id="stepper-nav" component="section">
            <NavStepper></NavStepper>
          </Box>
          {children}
        </DrawerCustom>

        {/* <Box
          p={2}
          mt={5}
          bgcolor="white"
          className={classes.contentWrapper}
        ></Box> */}
      </Box>
    </>
  );
}

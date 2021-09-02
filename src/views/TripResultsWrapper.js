import { Box } from "@material-ui/core";
import { useLocation } from "react-router";
import Map from "../components/Map";
import NavStepper from "../components/Stepper";
import DrawerCustom from "../components/DrawerCustom";

import useTripResultsWrapperStyle from "../styles/useTripResultsWrapperStyle";
export default function TripResultsWrapper({ children }) {
  const classes = useTripResultsWrapperStyle();
  const { pathname } = useLocation();

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        bgcolor="primary.main"
        className={classes.contentWrapper}
      >
        {pathname.includes("tripsummary") ? (
          <Map type="TripSummary" />
        ) : (
          <Map type="SingleDay" />
        )}

        <DrawerCustom heading="Trip Summary">
          <Box id="stepper-nav" component="section">
            <NavStepper></NavStepper>
          </Box>
          {children}
        </DrawerCustom>
      </Box>
    </>
  );
}

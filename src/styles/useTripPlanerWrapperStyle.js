import { makeStyles } from "@material-ui/core/styles";

const useTripPlanerWrapperStyle = makeStyles((theme) => ({
  cityHeading: {
    color: theme.palette.primary.contrastText,
  },
  contentWrapper: {
    borderRadius: "20px 20px 0 0",
    position: "relative",
    top: "35vh",
    // height: "auto",
    zIndex: "1000",
  },
  planerWrapper: {
    background:
      "linear-gradient(142deg, rgba(2,0,36,1) 0%, rgba(63,81,181,1) 35%, rgba(245,0,87,1) 100%)",
    width: "100%",
    // height: "100%",
  },
  headingContainer: {
    position: "absolute",
    top: 0,
    width: "inherit",
  },
  mapWrapper: {
    position: "absolute",
    top: 0,
    width: "inherit",
  },
  textField: {
    width: "80%",
  },
  backgroundWrapper: {
    background:
      "linear-gradient(142deg, rgba(2,0,36,1) 0%, rgba(63,81,181,1) 35%, rgba(245,0,87,1) 100%)",
    height: "50vh",
    position: "absolute",
    top: "0",
    width: "inherit",
  },
}));

export default useTripPlanerWrapperStyle;

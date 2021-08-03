import { makeStyles } from "@material-ui/core/styles";

const useTripPlanerWrapperStyle = makeStyles((theme) => ({
  cityHeading: {
    color: theme.palette.primary.contrastText,
  },
  contentWrapper: {
    borderRadius: "20px 20px 0 0",
    position: "relative",
    top: "200px",
  },
  headerWrapper: {
    background: "rgb(2,0,36)",
    background:
      "linear-gradient(142deg, rgba(2,0,36,1) 0%, rgba(63,81,181,1) 35%, rgba(245,0,87,1) 100%)",
  },
  headingContainer: {
    position: "absolute",
    top: 0,
  },
}));

export default useTripPlanerWrapperStyle;

import { makeStyles } from "@material-ui/core/styles";

const useTripResultsWrapperStyle = makeStyles((theme) => ({
  cityHeading: {
    color: theme.palette.primary.contrastText,
  },
  contentWrapper: {
    borderRadius: "20px 20px 0 0",
    position: "relative",
    top: "500px",
    zIndex: "1000",
  },
  headerWrapper: {
    background:
      "linear-gradient(142deg, rgba(2,0,36,1) 0%, rgba(63,81,181,1) 35%, rgba(245,0,87,1) 100%)",
  },
  MapContainer: {
    position: "absolute",
    top: 0,
  },
}));

export default useTripResultsWrapperStyle;

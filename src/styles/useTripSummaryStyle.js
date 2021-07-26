import { makeStyles } from "@material-ui/core";

const useTripSummaryStyle = makeStyles((theme) => ({
  headingContainer: {
    // backgroundImage: `url(${process.env.PUBLIC_URL + "citySkyline.jpg"})`,
    height: `calc(${theme.typography.h2.fontSize} + ${theme.typography.h5.fontSize}  )`,
    // padding: `0 ${theme.spacing(2)}px`,
    // margin: 0,
    overflow: "hidden",
  },
  customTimelineIcon: {
    backgroundColor: "white",
    color: "black",
  },
  cityHeading: {
    color: theme.palette.primary.contrastText,
  },
  timelineSeperator: {
    width: "4px",
    backgroundColor: theme.palette.secondary.main,
  },
  textAlignRight: {
    textAlign: "right",
    textDecoration: "underline",
  },
}));

export default useTripSummaryStyle;

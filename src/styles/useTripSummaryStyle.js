import { makeStyles } from "@material-ui/core";
import React from "react";

const useTripSummaryStyle = makeStyles((theme) => ({
  headingContainer: {
    // alignSelf: "flex-start",
    width: "100%",
    padding: 0,
    backgroundImage: `url(${process.env.PUBLIC_URL + "citySkyline.jpg"})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: `calc(${theme.typography.h1.fontSize} * 1.5)`,
    padding: theme.spacing(2),
  },
}));

export default useTripSummaryStyle;

import React from "react";
import NavStepper from "../components/Stepper";
import CardPlaceholder from "../components/CardPlaceholder";
import Box from "@material-ui/core/Box";
import Star from "@material-ui/icons/Star";
import Typography from "@material-ui/core/Typography";
import "../styles/tripSummary.css";
import { sizing } from "@material-ui/system";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import useTripSummaryStyle from "../styles/useTripSummaryStyle";
import { useTripContext } from "../context/TripContext";

export default function TripSummary() {
  const classes = useTripSummaryStyle();
  const { tripData } = useTripContext();
  return (
    <>
      <Box id="stepper-nav" component="section">
        <NavStepper></NavStepper>
      </Box>

      <Box
        className={classes.headingContainer}
        id="heading-container"
        component="section"
      >
        <Typography variant="h5" component="p" color="textSecondary">
          Welcome to
        </Typography>
        <Typography variant="h2" component="p" color="textPrimary">
          Barcelona
        </Typography>
      </Box>

      <Box width="100%" boxSizing="border-box" padding={2} component="section">
        <Typography variant="h5" component="p" align="center">
          Trip overview
        </Typography>
        <List component="ul">
          <ListItem>
            <ListItemText
              primary="Trip dates"
              secondary={tripData.tripStarts}
              primaryTypographyProps={{ variant: "h6" }}
              secondaryTypographyProps={{ color: "textPrimary" }}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Trip dates"
              secondary="12th June - 24th June"
              primaryTypographyProps={{ variant: "h6" }}
              secondaryTypographyProps={{ color: "textPrimary" }}
            />
          </ListItem>
        </List>
      </Box>

      <Box padding={1} id="highlights-container">
        <Timeline>
          <TimelineItem classes={{ root: "removeLeftSpace" }}>
            <TimelineSeparator>
              <TimelineDot
                color="grey"
                variant="default"
                classes={{ root: classes.customTimelineIcon }}
              >
                <Star
                  fontSize="large"
                  color="secondary"
                  variant="outline"
                ></Star>
              </TimelineDot>
              <TimelineConnector color="primary" />
            </TimelineSeparator>
            <TimelineContent>
              <CardPlaceholder></CardPlaceholder>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem classes={{ root: "removeLeftSpace" }}>
            <TimelineSeparator>
              <TimelineDot
                color="grey"
                variant="default"
                classes={{ root: classes.customTimelineIcon }}
              >
                <Star fontSize="large" color="secondary"></Star>
              </TimelineDot>
              <TimelineConnector color="secondary" />
            </TimelineSeparator>
            <TimelineContent classes={{ root: "removeLeftSpace" }}>
              <CardPlaceholder></CardPlaceholder>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem classes={{ root: "removeLeftSpace" }}>
            <TimelineSeparator>
              <TimelineDot
                color="grey"
                variant="default"
                classes={{ root: classes.customTimelineIcon }}
              >
                <Star fontSize="large" color="secondary"></Star>
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent classes={{ root: "removeLeftSpace" }}>
              <CardPlaceholder></CardPlaceholder>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Box>
    </>
  );
}

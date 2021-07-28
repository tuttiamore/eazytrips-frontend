import React from "react";
import useSuggestedPlacesStyle from "../styles/useSuggestedPlacesStyle";
import {
    Box,
    Typography,
    Chip,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@material-ui/core";


export default function SuggestedPlaces() {
    const classes = useSuggestedPlacesStyle();

    return (
        <>
            <Box>
                <Typography variant="h5" component="p" color="textPrimary">
                    Suggested Places
                </Typography>
            </Box>

            {/* <Box>
                <List
                    style={{
                        height: "100%",
                        overflow: "auto",
                        padding: "8px",
                        width: "80%",
                        margin: "auto",
                    }}
                >
                    {tripData.trip[day - 1].locations.map((element, index) => (
                        <>
                            <Card
                                key={element.locationIndex}
                                type="SuggestedPlaces"
                                data={element}
                            />
                            {tripData.trip[day - 1].locations[index + 1] && (
                                <div className={classes.div}>
                                    <span className={classes.span} />
                                    <Typography className={classes.distance} variant="body1">
                                        {tripData.trip[day - 1].locations[index].travelTo} min
                                    </Typography>
                                    <DirectionsWalkIcon fontSize="large" />
                                </div>
                            )}
                        </>
                    ))}
                </List>
            </Box> */}
        </>

    );

}
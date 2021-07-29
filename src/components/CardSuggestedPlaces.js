import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import LandscapeIcon from "@material-ui/icons/Landscape";
import useCardStyle from "../styles/useCardStyle";
import mockData from "../mock.json";
import Card from "@material-ui/core/Card";


export default function CardSuggestedPlaces() {

    const classes = useCardStyle();

    // const handleUpomingTripSelectClick = () => {
    //     history.push(`/tripSummary`);
    // };

    // if (type === "UpcomingTrip") {
    //     const tripName = data ? data : mockData.trip[0];

    return (
        <Card
            className={classes.landing}
        // onClick={() => handleUpomingTripSelectClick()}
        >
            {/* <CardHeader
                avatar={
                    <Avatar
                        variant="rounded"
                        aria-label="default"
                        className={classes.avatar}
                        src={avatarImage && avatarImage}
                    >
                        <LandscapeIcon />
                    </Avatar>
                }
                title={tripName} */}
            />
        </Card>
    );
}

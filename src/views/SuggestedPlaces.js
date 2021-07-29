import { useState } from "react";
import useSuggestedPlacesStyle from "../styles/useSuggestedPlacesStyle";
import Suggested from "../components/Card";
import { useTripContext } from "../context/TripContext";
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
    Box,
    Typography,
    List,
    ListItem
} from "@material-ui/core";


export default function SuggestedPlaces() {
    const [isSelected, setIsSelected] = useState({});

    console.log(isSelected)
    const handleChange = (e) => {
        // on Click: toggle selected status
        // set value of the checkbox to the opposite value of now
        setIsSelected({ ...isSelected, [e.target.name]: !isSelected[e.target.name] })
    }


    const handleSubmit = () => {
        // 
    }


    const classes = useSuggestedPlacesStyle();
    const { tripData } = useTripContext();

    return (
        <>
            <Box padding={2} id="highlights-container">
                <Typography variant="h5" component="p" gutterBottom>
                    Suggested Places
                </Typography>
                <List className={classes.listMarginBottom}
                // style={{
                //     height: "100%",
                //     overflow: "auto",
                //     padding: "8px",
                //     width: "80%",
                //     margin: "auto",
                // }}
                >
                    {tripData.rawDataPlaces.map((item, index) => (
                        <ListItem>
                            <Checkbox
                                color="primary"
                                key={index}
                                name={item.place_id}
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                onChange={handleChange}
                                checked={isSelected.place_id}
                            />
                            < Suggested
                                type="Suggested"
                                data={item.name}
                                key={item.place_id}
                            />
                        </ListItem>
                    ))}
                </List>
                <Typography variant="h5" component="p" gutterBottom>
                    Anything you don't want to miss?
                </Typography>

                <Box p={2}>
                    <TextField fullWidth id="additionalUserLocations" placeholder="Enter name of sight" variant="filled" />
                </Box>

                <Box p={2} align="right">
                    <Button variant="contained" color="primary">
                        SKIP/NEXT
                    </Button>
                </Box>
            </Box>
        </>
    );
}
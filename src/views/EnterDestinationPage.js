import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FilledInput from '@material-ui/core/FilledInput';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { flexbox, alignSelf } from '@material-ui/system';
import useEnterDestinationStyle from "../styles/useEnterDestinationStyle";
import Divider from '@material-ui/core/Divider';


export default function EnterDestinationPage() {
    const classes = useEnterDestinationStyle();

    return (
        <Box p={2}>
            <Grid container direction="column" justifyContent="center" spacing={3} p={3}>
                <Grid item xs={12} m={3} align="left">
                    <Typography variant="h5" component="p" color="textPrimary">
                        Where do you want to go?
                    </Typography>
                </Grid>

                <Grid item align="left" item xs={12} md={6}>
                    <TextField fullWidth id="filled-basic" label="Filled" variant="filled" />
                </Grid>

                <Divider />

                <Grid item align="center">
                    <Typography variant="h4" component="p" color="textPrimary">
                        Travel dates
                    </Typography>
                </Grid>

                <Grid item align="left">
                    <Typography variant="h5" component="p" color="textPrimary">
                        Datetime to start sightseeing
                    </Typography>
                </Grid>

                <Grid item align="left">
                    <form className={classes.container} noValidate>
                        <TextField
                            id="date"
                            label="Birthday"
                            type="date"
                            defaultValue="2017-05-24"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                </Grid>

                <Divider />

                <Grid item align="left">
                    <Typography variant="h5" component="p" color="textPrimary">
                        Where are you staying?
                    </Typography>
                </Grid>

                <Grid item align="left" item xs={12} md={6}>
                    <TextField fullWidth id="filled-basic" label="Filled" variant="filled" />
                </Grid>

                <Grid item align="left">
                    <Typography variant="h5" component="p" color="textPrimary">
                        Preferred means of transport?
                    </Typography>
                </Grid>

                <Grid item xs className={classes.chipAlignSelf}>
                    <Chip
                        icon={<DirectionsWalkIcon />}
                        label="Walking"
                        clickable
                        color="primary"
                    />
                </Grid>

                <Grid item alignItems="center" className={classes.chipAlignSelf}>
                    <Chip
                        icon={<DriveEtaIcon />}
                        label="Public Transport"
                        clickable
                        color="primary"
                    />
                </Grid>

                <Grid item align="right">
                    <Button variant="contained" color="primary">
                        SKIP/NEXT
                    </Button>
                </Grid>
            </Grid>
        </Box >
    );
}


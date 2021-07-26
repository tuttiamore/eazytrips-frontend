import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";

const useLandingPageButtonStyle = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(5),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    cardWidth: {
        // margin: "auto",
        justifyContent: "center",
        alignItems: "center",
    },
}));

export default useLandingPageButtonStyle;


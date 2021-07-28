import { makeStyles } from "@material-ui/core/styles";

const useSuggestedPlacesStyle = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(5),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    card: {
        alignSelf: "center",
    },
}));

export default useSuggestedPlacesStyle;

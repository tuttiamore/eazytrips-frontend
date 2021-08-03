import { makeStyles } from "@material-ui/core/styles";

const useBottomNavTripStyle = makeStyles((theme) => ({
  skip: {
    textDecoration: "underline",
    fontWeight: "bold",
  },
  skipDeactivated: {
    color: theme.palette.text.disabled,
  },
}));

export default useBottomNavTripStyle;

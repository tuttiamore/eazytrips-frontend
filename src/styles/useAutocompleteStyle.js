import { makeStyles } from "@material-ui/core/styles";

const useLandingPageStyle = makeStyles((theme) => ({
  searchBar: {
    backgroundColor: "white",
    borderRadius: "4px",
    padding: theme.spacing(1),
    // paddingLeft: theme.spacing(2),
    display: "flex",
    width: "auto",
  },
  submitButton: {
    padding: 0,
    margin: 0,
    minWidth: 0,
  },
  input: {
    paddingLeft: theme.spacing(2),
  },
}));

export default useLandingPageStyle;

import { makeStyles } from "@material-ui/core/styles";

const useLandingPageStyle = makeStyles((theme) => ({
  searchBarContainer: {
    backgroundImage: `url("malte-schmidt-enGr5YbjQKQ-unsplash.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%",
  },
  searchBar: {
    backgroundColor: "white",
    borderRadius: "4px",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    display: "flex",
    width: "auto",
  },
  headingDiscover: {
    color: theme.palette.primary.contrastText,
  },
  submitButton: {
    padding: 0,
    margin: 0,
    minWidth: 0,
  },
}));

export default useLandingPageStyle;

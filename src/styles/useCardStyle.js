import { makeStyles } from "@material-ui/core/styles";

const useCardStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  media: {
    height: 0,
  },
  tick: {
    padding: "0",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    padding: "0px",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  outer: {
    margin: "8px 0",
    width: "100%",
  },
  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: "8px",
  },
  span: {
    backgroundColor: theme.palette.secondary.light,
    width: "8px",
    height: "72px",
    margin: "0 16px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "16px",
  },
  distance: {
    padding: "4px",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),

    backgroundColor: theme.palette.primary.dark,
  },
  landing: {
    width: "80%",
    alignSelf: "center",
  },
  address: {},
  suggested: {
    width: "100%",

    // margin: " 16px auto",
  },
  // suggestedOuter: {
  //   maxWidth: "80%",
  //   margin: "8px 0",
  // },
  accommodation: {
    padding: "0px 0px 24px",
    margin: "8px 0",
  },
  divide: {
    margin: theme.spacing(5),

    backgroundColor: theme.palette.primary.dark,
  },
}));

export default useCardStyle;

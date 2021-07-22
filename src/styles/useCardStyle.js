import { makeStyles } from "@material-ui/core/styles";

const useCardStyle = makeStyles((theme) => ({
  root: {
    maxWidth: "75%",

    margin: " 16px auto",
  },
  media: {
    height: 0,
    paddingTop: "", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default useCardStyle;

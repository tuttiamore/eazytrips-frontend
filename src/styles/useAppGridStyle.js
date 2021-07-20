import { makeStyles } from "@material-ui/core/styles";

const useAppGridStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    alignSelf: "flex-start",
  },
  footer: {
    alignSelf: "flex-end",
  },
}));

export default useAppGridStyle;

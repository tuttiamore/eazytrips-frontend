import { makeStyles } from "@material-ui/core/styles";

const useAppGridStyle = makeStyles((theme) => ({
  header: {
    // alignSelf: "flex-start",
    flex: 1,
  },
  main: {
    // alignSelf: "stretch",
    flex: 5,
  },
  footer: {
    // alignSelf: "flex-end",
    flex: 1,
  },
}));

export default useAppGridStyle;

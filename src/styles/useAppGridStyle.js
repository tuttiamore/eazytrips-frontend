import { makeStyles } from "@material-ui/core/styles";

const useAppGridStyle = makeStyles((theme) => ({
  header: {
    alignSelf: "flex-start",
    //flex: 1,
    height: "10%",
  },
  main: {
    alignSelf: "flex-start",
    height: "80%",
    maxHeight: "100%",
    overflow: "auto",
  },
  footer: {
    alignSelf: "flex-end",
    //flex: 1,
    height: "10%",
  },
}));

export default useAppGridStyle;

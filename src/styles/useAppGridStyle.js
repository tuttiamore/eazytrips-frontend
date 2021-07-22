import { makeStyles } from "@material-ui/core/styles";

const useAppGridStyle = makeStyles((theme) => ({
  header: {
    alignSelf: "flex-start",
    //flex: 1,
    height: "5%",
  },
  main: {
    alignSelf: "flex-start",
    height: "85%",
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

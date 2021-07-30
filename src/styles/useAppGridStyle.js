import { makeStyles } from "@material-ui/core/styles";

const useAppGridStyle = makeStyles((theme) => ({
  main: {
    height: "90%",
    maxHeight: "100%",
    overflow: "auto",
    boxSizing: "border-box"
  },
  footer: {
    height: "10%",
  },
}));

export default useAppGridStyle;

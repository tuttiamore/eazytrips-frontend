import { makeStyles } from "@material-ui/core/styles";

const useAppGridStyle = makeStyles((theme) => {
  return {
    main: {
      height: "90%",
      maxHeight: "100%",
      overflow: "auto",
      boxSizing: "border-box",
    },
    footer: {
      height: "10%",
    },
    app: {
      height: "100vh",
      margin: "0 auto",
    },
    widthBreakpointLg: {
      width: "100%",
    },
    widthBreakpointSm: {
      width: "50%",
    },
    dropShadow: {
      boxShadow: "5px 5px 5px grey;",
    },
  };
});

export default useAppGridStyle;

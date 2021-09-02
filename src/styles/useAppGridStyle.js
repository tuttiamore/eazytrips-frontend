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
      height: "100%",
      margin: "0 auto",
      overflow: "hidden",
      position: "relative",
    },
    widthBreakpointLg: {
      width: "100%",
    },
    widthBreakpointSm: {
      width: "50%",
    },
    dropShadow: {
      boxShadow: "3px 3px 3px 3px lightgrey;",
    },
  };
});

export default useAppGridStyle;

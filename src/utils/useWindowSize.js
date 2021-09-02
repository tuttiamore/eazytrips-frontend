import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

export default function useAppGridStyle() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  console.log("windowSize is", windowSize.height);
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  const createAppClasses = makeStyles((theme) => {
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
        height: !windowSize ? "100vh" : `${windowSize.height}px`,
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

  return createAppClasses();
}

import { makeStyles } from "@material-ui/core";

const useMapStyle = makeStyles((theme) => ({
  headingContainer: {
    // backgroundImage: `url(${process.env.PUBLIC_URL + "citySkyline.jpg"})`,
    height: `calc(${theme.typography.h2.fontSize} + ${theme.typography.h5.fontSize}  )`,
    // padding: `0 ${theme.spacing(2)}px`,
    // margin: 0,
    overflow: "hidden",
  },
}));

export default useMapStyle;

import { makeStyles } from "@material-ui/core/styles";

const useEnterDestinationStyle = makeStyles((theme) => ({
  chipAlignSelf: {
    alignSelf: "center",
  },
  gridMarginRight: {
    marginRight: theme.spacing(1),
  },
}));

export default useEnterDestinationStyle;

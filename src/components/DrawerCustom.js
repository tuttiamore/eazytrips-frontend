import { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, Button } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const drawerHeight = 50;

const useStyles = makeStyles((theme) => ({
  drawer: {
    height: drawerHeight,
    borderRadius: "20px 20px 0 0",
    // flexShrink: 0,
    // whiteSpace: "nowrap",
  },
  paper: {
    boxSizing: "border-box",
    borderRadius: "20px 20px 0 0",
    padding: `0 ${theme.spacing(3)}px 0 ${theme.spacing(3)}px`,
    bottom: "10vh",
  },

  drawerOpen: {
    height: `${drawerHeight}%`,
    transition: theme.transitions.create("height", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("height", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowY: "hidden",
    height: "40px",
  },
}));

export default function DrawerCustom({ children }) {
  const classes = useStyles();
  const [toggleOpen, setToggleOpen] = useState(false);

  return (
    <div>
      <Drawer
        anchor="bottom"
        open={toggleOpen}
        variant="permanent"
        ModalProps={{
          BackdropProps: {
            invisible: true,
          },
        }}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: toggleOpen === true,
          [classes.drawerClose]: toggleOpen === false,
        })}
        classes={{
          paper: clsx(classes.paper, {
            [classes.drawerOpen]: toggleOpen === true,
            [classes.drawerClose]: toggleOpen === false,
          }),
        }}
      >
        <Button onClick={() => setToggleOpen(!toggleOpen)}>
          {toggleOpen && <ExpandMoreIcon></ExpandMoreIcon>}
          {!toggleOpen && <ExpandLessIcon></ExpandLessIcon>}
        </Button>

        {children}
      </Drawer>
    </div>
  );
}

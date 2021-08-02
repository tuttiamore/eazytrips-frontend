import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";

const options = ["Home", "TripSummary", "tripsingleday"];

const ITEM_HEIGHT = 48;

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  let history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // console.log(event);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLinks = (option) => {
    console.log(option);
    setAnchorEl(null);
    if (option === "Home") return history.push("/");
    if (option === "TripSummary") return history.push("/tripsummary");
    if (option === "tripsingleday") return history.push("/tripsingleday/1");

    // e === "Home"
    //   ? history.push("/")
    //   : e === "TripSummary"
    //   ? history.push("/tripsummary")
    //   : history.push("/tripsingleday/1");
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
    >
      <div>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} onClick={() => handleLinks(option)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Grid>
  );
}

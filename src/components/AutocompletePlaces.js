import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { TextField, InputAdornment, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@material-ui/lab";
import { spacing } from "@material-ui/system";

import { useTripContext } from "../context/TripContext";
import useAutocompleteStyle from "../styles/useAutocompleteStyle";

export default function AutocompletePlaces({
  nextPath,
  isSearchIcon,
  variant,
}) {
  const [destination, setDestination] = useState();
  const [inputValue, setInputValue] = useState(null);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [sessionToken, setSessionToken] = useState();
  const { setTripDataRaw } = useTripContext();
  const classes = useAutocompleteStyle();
  const history = useHistory();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    history.push(nextPath);
  };

  const handleFinalSelection = (e, newValue) => {
    console.log("value changed");
    setDestination(newValue);
  };

  // use effect for suggestions
  useEffect(() => {
    console.log("use effect inputValue fired");

    const getCitySuggestions = async () => {
      try {
        const body = {
          prefix: inputValue,
          sessionToken,
        };
        const { data } = await axios.post(
          "http://localhost:3000/autocomplete",
          body
        );
        console.log(data);
        setCitySuggestions(data.predictions || []);
      } catch (err) {
        console.log(err);
      }
    };

    getCitySuggestions();
  }, [inputValue]);

  // use effect for final call to google places
  useEffect(() => {
    const getPlacesDetails = async () => {
      try {
        const place_id = citySuggestions.find(
          (city) => destination === city.description
        ).place_id;
        console.log("place_id is", place_id);
        const { data } = await axios.get(
          `http://localhost:3000/autocomplete/${place_id}`
        );
        setTripDataRaw(data);
        // history.push(nextPath);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (destination) {
      getPlacesDetails();
      console.log("submitted");
    } else {
      console.log("destination not set");
    }
    setTripDataRaw({ destination });
    // history.push("/plantrip");
  }, [destination]);

  // useEffect for session token for gplaces API
  useEffect(() => {
    setSessionToken(uuidv4());
  }, []);

  return (
    <form onSubmit={handleSearchSubmit}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={citySuggestions.map((city) => city.description)}
        renderInput={(params) => (
          <TextField
            {...params}
            className={classes.searchBar}
            id="input-with-icon-textfield"
            variant={variant}
            InputProps={{
              ...params.InputProps,
              type: "search",
              endAdornment: isSearchIcon && (
                <InputAdornment position="end">
                  <Button
                    className={classes.submitButton}
                    size="small"
                    type="submit"
                  >
                    <SearchIcon color="primary" />
                  </Button>
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
            // onChange={handleSearchChange}
            size="medium"
            placeholder="Enter a destination"
            fullWidth={false}
            value={inputValue}
          ></TextField>
        )}
        onChange={(e, newValue) => handleFinalSelection(e, newValue)}
        onInputChange={(e, newValue) => {
          console.log("input changed");
          setInputValue(newValue);
        }}
        // onClose={handleSearchSubmit}
      />
    </form>
  );
}

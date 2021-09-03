import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { TextField, InputAdornment, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@material-ui/lab";

import { useTripContext } from "../context/TripContext";

import useAutocompleteStyle from "../styles/useAutocompleteStyle";

export default function AutocompletePlaces({
  nextPath,
  isSearchIcon,
  variant,
  placeType,
}) {
  const [destination, setDestination] = useState();
  const [inputValue, setInputValue] = useState(null);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [sessionToken, setSessionToken] = useState();
  const { tripDataRaw, setTripDataRaw } = useTripContext();
  const classes = useAutocompleteStyle();
  const history = useHistory();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (tripDataRaw && tripDataRaw.destination) {
      history.push(nextPath);
    }
  };

  const handleFinalSelection = (e, newValue) => {
    setDestination(newValue);
  };

  // use effect for suggestions
  useEffect(() => {
    const getCitySuggestions = async (sessionToken, prefix) => {
      try {
        const body = {
          prefix: inputValue,
          sessionToken,
          type: placeType === "accommodation" ? "address" : "cities",
        };
        const { data } = await axios.post(
          "https://eazytrips-backend.herokuapp.com/autocomplete",
          body
        );
        setCitySuggestions(data.predictions || []);
      } catch (err) {
        console.log(err);
      }
    };

    if (inputValue) {
      getCitySuggestions();
    }
  }, [inputValue, sessionToken, placeType]);

  // use effect for final call to google places
  useEffect(() => {
    const getPlacesDetails = async () => {
      try {
        const place_id = citySuggestions.find(
          (city) => destination === city.description
        ).place_id;
        const { data } = await axios.get(
          `https://eazytrips-backend.herokuapp.com/autocomplete/${place_id}`
        );

        // either set accommodation or destination dependent on route and set all required fields
        if (placeType === "destination") {
          setTripDataRaw({
            destination: data.placeAddress,
            destinationCoords: data.placeCoords,
            transportation: {},
            tripStarts: "",
            tripEnds: "",
          });
        }

        if (placeType === "accommodation") {
          setTripDataRaw({
            ...tripDataRaw,
            accommodation: data.placeAddress,
            accommodationCoords: data.placeCoords,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (destination) {
      getPlacesDetails();
    }
    // eslint-disable-next-line
  }, [destination]);

  // useEffect for session token for gplaces API
  useEffect(() => {
    setSessionToken(uuidv4());
  }, []);

  return (
    <form onSubmit={handleSearchSubmit}>
      <Autocomplete
        freeSolo
        id="autocomplete-places-search"
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
              className: classes.input,
              disableUnderline: true,
            }}
            size="medium"
            placeholder="Enter a destination"
            fullWidth={false}
            value={inputValue}
          ></TextField>
        )}
        onChange={(e, newValue) => handleFinalSelection(e, newValue)}
        onInputChange={(e, newValue) => {
          setInputValue(newValue);
        }}
      />
    </form>
  );
}

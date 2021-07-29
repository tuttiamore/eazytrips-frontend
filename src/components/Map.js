import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import Box from "@material-ui/core/Box";
import { useTripContext } from "../context/TripContext";
import { useTheme } from "@material-ui/styles";
import axios from "axios";
import geojsonMock from "../mockRoute.json";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
export default function Map({ trip, type }) {
  //import theme
  const theme = useTheme();

  // get access to backend data
  const { tripData } = useTripContext();

  // select day from params
  const { day } = useParams();
  const dayIndexSpecificData = tripData.trip[day - 1];
  // console.log({ dayIndexSpecificData: dayIndexSpecificData });

  // console.log({ tripData: tripData });

  // assign the accomodation coordinates that are used as the center of the map
  const accomodationLng = tripData.accomodationCoords.lng;
  const accomodationLat = tripData.accomodationCoords.lat;

  // Create array containing all the coordinates of the waypoint
  let markerCoordinates = [
    {
      lng: accomodationLng,
      lat: accomodationLat,
    },
  ];
  let waypointCoordinates = [[accomodationLng, accomodationLat]];

  const [isFetching, setIsFetching] = useState(true);
  //put all the coordinates of all locations in the day into the waypointCoordinates
  for (let location of dayIndexSpecificData.locations) {
    const rawDataEquivalent = tripData.rawDataPlaces.find(
      (item) => item.place_id === location.place_id
    );
    waypointCoordinates.push([
      rawDataEquivalent.geometry.location.lng,
      rawDataEquivalent.geometry.location.lat,
    ]);

    markerCoordinates.push({
      lng: rawDataEquivalent.geometry.location.lng,
      lat: rawDataEquivalent.geometry.location.lat,
    });
    // console.log(waypointCoordinates);
  }
  //find the corresponding Place from raw data based on the day in the params
  const rawDataEquivalent = (locationIndex) => {
    tripData.rawDataPlaces.find(
      (item) => item.place_id === dayIndexSpecificData.locations[1].place_id
    );
    // console.log({ rawDataEquivalent: rawDataEquivalent });
  };

  //  // helper functions

  // initialize and instantiate Mapbox
  const mapContainer = useRef(null);
  const map = useRef(null);

  const zoom = 12;

  const fetchRoute = useCallback(
    async (meansOfTransport) => {
      const url = `https://api.mapbox.com/directions/v5/mapbox/${meansOfTransport}/`;
      let almostApiEndpoint = url;
      // console.log(waypointCoordinates);
      for (let coordinate of waypointCoordinates) {
        // console.log({ coordinate: coordinate });
        almostApiEndpoint += coordinate[0] + "," + coordinate[1] + ";";
      }
      let apiEndpoint = almostApiEndpoint.substring(
        0,
        almostApiEndpoint.length - 1
      );
      apiEndpoint +=
        "?steps=true&geometries=geojson&access_token=" + mapboxgl.accessToken;
      // console.log(apiEndpoint);

      try {
        // console.log("fetching");
        // const retrievedRoute = await axios.get(apiEndpoint);

        console.log(apiEndpoint);
        // const route =

        const geojson = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: geojsonMock.routes[0].geometry.coordinates,
            // coordinates: [
            //   [13.410051, 52.53217],
            //   [13.783270835876465, 52.481197357177734],
            //   [13.61210747664655, 52.465004286603545],
            // ],
          },
        };

        if (map.current.getSource("route")) {
          console.log("in the if block");
          map.current.getSource("route").setData(geojson);
        } else {
          console.log("in the else block");
          map.current.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: geojsonMock.routes[0].geometry.coordinates,
              },
            },
          });
          map.current.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#3887be",
              "line-width": 5,
              "line-opacity": 0.75,
            },
          });
        }
        //   console.log("in the else block");
        //   console.log({ geojson });
        //   map.current.addLayer({
        //     id: "route",
        //     type: "line",
        //     source: {
        //       type: "geojson",
        //       data: {
        //         type: "Feature",
        //         properties: {},
        //         geometry: {
        //           type: "LineString",
        //           coordinates: geojson,
        //         },
        //       },
        //     },
        //     layout: {
        //       "line-join": "round",
        //       "line-cap": "round",
        //     },
        //     paint: {
        //       "line-color": "#FF0000",
        //       "line-width": 5,
        //       "line-opacity": 0.75,
        //     },
        //   });
        // }
        // console.log(map.current);
      } catch (err) {
        console.log(err.message);
      }
    },
    [waypointCoordinates]
  );

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [accomodationLng, accomodationLat],
      zoom: zoom,
      scrollZoom: true,
    });

    map.current.on("load", () => {
      console.log("fetching routes");
      fetchRoute("cycling");
      console.log(map);
      // function that gets a place_id as a parameter and returns a marker on the map by getting the coordinates from the initial rawData
      const addAndSetMarkers = () => {
        console.log("displaying markers");
        for (let item in markerCoordinates) {
          //console.log(markerCoordinates);
          const marker = new mapboxgl.Marker({
            color: theme.palette.primary.light,
            draggable: false,
            scale: 0.5,
            markerSymbol: 1,
          })
            .setLngLat(markerCoordinates[item])
            .setPopup(new mapboxgl.Popup().setHTML(rawDataEquivalent.name))
            .addTo(map.current);
        }
      };
      console.log(map.current.painter.currentLayer);
      addAndSetMarkers();
    });
  }, [day]);

  return (
    <Box p={3}>
      <Box
        ref={mapContainer}
        className="map-container"
        style={{ height: "70vw", width: "100%", maxHeight: "600px" }}
      />
    </Box>
  );
}

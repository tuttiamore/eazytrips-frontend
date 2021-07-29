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

  // initialize and instantiate Mapbox
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    const dayIndexSpecificData = tripData.trip[day - 1];

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
    console.log(markerCoordinates);
    let waypointCoordinates = [[accomodationLng, accomodationLat]];

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
    }
    //find the corresponding Place from raw data based on the day in the params
    const rawDataEquivalent = (locationIndex) => {
      tripData.rawDataPlaces.find(
        (item) => item.place_id === dayIndexSpecificData.locations[1].place_id
      );
    };

    const zoom = 12;

    const fetchRoute = async (meansOfTransport) => {
      const url = `https://api.mapbox.com/directions/v5/mapbox/${meansOfTransport}/`;
      let almostApiEndpoint = url;

      for (let coordinate of waypointCoordinates) {
        almostApiEndpoint += coordinate[0] + "," + coordinate[1] + ";";
      }
      let apiEndpoint = almostApiEndpoint.substring(
        0,
        almostApiEndpoint.length - 1
      );
      apiEndpoint +=
        "?steps=true&geometries=geojson&access_token=" + mapboxgl.accessToken;
      console.log(apiEndpoint);
      try {
        const retrievedRoute = await axios.get(apiEndpoint);

        const geojson = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: retrievedRoute.data.routes[0].geometry.coordinates,
          },
        };

        if (map.current.getSource("route")) {
          map.current.getSource("route").setData(geojson);
        } else {
          map.current.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: retrievedRoute.data.routes[0].geometry.coordinates,
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
      } catch (err) {
        console.log(err.message);
      }
    };
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [accomodationLng, accomodationLat],
      zoom: zoom,
      scrollZoom: true,
    });

    map.current.on("load", () => {
      fetchRoute("walking");

      // function that gets a place_id as a parameter and returns a marker on the map by getting the coordinates from the initial rawData

      const addAndSetMarkers = () => {
        for (let item in markerCoordinates) {
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
  });

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

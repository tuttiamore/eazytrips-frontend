import React, { useRef, useEffect } from "react";
import { useParams } from "react-router";
import Box from "@material-ui/core/Box";
import { useTripContext } from "../context/TripContext";
import { useTheme } from "@material-ui/styles";

import axios from "axios";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Map({ trip, type, isSelected }) {
  //import theme
  const theme = useTheme();

  // get access to backend data
  const { tripData, tripDataRaw } = useTripContext();

  // select day from params
  const { day } = useParams();

  // initialize and instantiate Mapbox
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    let paramSpecificData;
    let tripDataUse = type === "SuggestedPlaces" ? tripDataRaw : tripData;

    // assign the accommodation coordinates that are used as the center of the map

    const accommodationLng = tripDataUse.accommodationCoords.lng;
    const accommodationLat = tripDataUse.accommodationCoords.lat;
    const accommodationLngLat = [accommodationLng, accommodationLat];

    let mapCenter = [
      (tripDataUse.rawDataPlaces[0].geometry.location.lng + accommodationLng) /
        2,
      (tripDataUse.rawDataPlaces[0].geometry.location.lat + accommodationLat) /
        2,
    ];
    // Create array containing all the coordinates of the waypoint
    let waypointCoordinates = [[accommodationLng, accommodationLat]];

    let markerCoordinates = [];
    let markerTitles = [];
    let popUpInfo = [];
    let zoom = 11;
    if (type === "SuggestedPlaces") {
      waypointCoordinates = null;
      paramSpecificData = tripDataRaw.rawDataPlaces;
      for (let place of paramSpecificData) {
        markerCoordinates.push({
          lng: place.geometry.location.lng,
          lat: place.geometry.location.lat,
        });
        markerTitles.push(place.name);
        popUpInfo.push(place.vicinity);
      }
      mapCenter = [
        paramSpecificData[0].geometry.location.lng,
        paramSpecificData[0].geometry.location.lat - 0.02,
      ];
      zoom = 12.5;
    }
    if (type === "SingleDay") {
      zoom = 13.5;
      paramSpecificData = tripData.trip[day - 1];
      for (let location of paramSpecificData.locations) {
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
        markerTitles.push(rawDataEquivalent.name);
        popUpInfo.push(rawDataEquivalent.vicinity);
      }
    }
    if (type === "TripSummary") {
      waypointCoordinates = null;

      for (let day in tripData.trip) {
        zoom = 12.4;
        if (tripData.trip[day].highlight.place_id) {
          const rawDataEquivalent = tripData.rawDataPlaces.find(
            (item) => item.place_id === tripData.trip[day].highlight.place_id
          );

          markerCoordinates.push({
            lng: rawDataEquivalent.geometry.location.lng,
            lat: rawDataEquivalent.geometry.location.lat,
          });
          markerTitles.push(rawDataEquivalent.name);
          popUpInfo.push(rawDataEquivalent.vicinity);
        }
      }
    }
    //put all the coordinates of all locations in the day into the waypointCoordinates

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
              "line-color": theme.palette.secondary.light,
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
      center: mapCenter,
      zoom: zoom,
      scrollZoom: false,
    });
    map.current.addControl(new mapboxgl.FullscreenControl());
    map.current.addControl(new mapboxgl.NavigationControl());
    map.current.on("load", () => {
      if (waypointCoordinates && tripData.transportation.walking)
        fetchRoute("walking");
      if (waypointCoordinates && tripData.transportation.public)
        fetchRoute("driving");
      if (waypointCoordinates && tripData.transportation.cycling)
        fetchRoute("cycling");

      // function that gets a place_id as a parameter and returns a marker on the map by getting the coordinates from the initial rawData
      let markerFeatures = [
        {
          // feature for Mapbox DC
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: accommodationLngLat,
          },
          properties: {
            title: "Accomodation",
          },
        },
      ];
      const addAndSetMarkers = () => {
        const marker = new mapboxgl.Marker({
          color: theme.palette.secondary.dark,
          draggable: false,
          scale: 1,
          markerSymbol: 2,
        })
          .setLngLat(accommodationLngLat)
          .setPopup(new mapboxgl.Popup().setHTML("Accommodation"))
          .addTo(map.current);
        for (let item in markerCoordinates) {
          let markerColor = theme.palette.primary.light;
          if (type === "SuggestedPlaces") {
            let markerPlaceId = tripDataRaw.rawDataPlaces[item].place_id;

            // isSelected[markerPlaceId]
            //   ? (markerColor = theme.palette.primary.light)
            //   : (markerColor = theme.palette.secondary.light);
          }
          const marker = new mapboxgl.Marker({
            color: markerColor,
            draggable: false,
            scale: 0.9,
            markerSymbol: 1,
          })
            .setLngLat(markerCoordinates[item])
            .setPopup(new mapboxgl.Popup().setHTML(popUpInfo[item]))
            .addTo(map.current);
          markerFeatures.push({
            // feature for Mapbox DC
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                markerCoordinates[item].lng,
                markerCoordinates[item].lat,
              ],
            },
            properties: {
              title: markerTitles[item],
            },
          });
        }
      };

      addAndSetMarkers();

      map.current.addSource("points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: markerFeatures,
        },
      });
      map.current.addLayer({
        id: "points",
        type: "symbol",
        source: "points",
        layout: {
          // get the title name from the source's "title" property
          "text-field": ["get", "title"],
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.75],
          "text-anchor": "top",
        },
      });
    });
  }, [day]);

  return (
    <Box
      ref={mapContainer}
      className="map-container"
      style={{
        height: "85%",
        width: "100%",
        position: "absolute",
        top: "0",
      }}
    ></Box>
  );
}

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
//console.log(type);
const [isFetching, setIsFetching] = useState(true);
const [routeCoordinates, setRouteCoordinates] = useState([]);
const { day } = useParams();
const theme = useTheme();
const { tripData } = useTripContext();
const accomodationLat = tripData.accomodationCoords.lat;
const accomodationLng = tripData.accomodationCoords.lng;
const zoom = 12;

const mapContainer = useRef(null);
const map = useRef(null);

const fetchRoute = useCallback(
  async (routeStopCoordinates) => {
    let route;
    const url = "https://api.mapbox.com/directions/v5/mapbox/cycling/";
    let apiEndpoint = url + accomodationLng + "," + accomodationLat;
    for (let coordinate of routeStopCoordinates) {
      apiEndpoint += ";" + coordinate[0] + "," + coordinate[1];
    }
    apiEndpoint +=
      "?steps=true&geometries=geojson&access_token=" + mapboxgl.accessToken;
    // console.log(apiEndpoint);

    try {
      const retrievedRoute = await axios.get(apiEndpoint);
      // console.log(retrievedRoute.data.routes[0].geometry.coordinates);
      route = retrievedRoute.data.routes[0].geometry.coordinates;

      setIsFetching(false);
    } catch (err) {
      console.log(err.message);
    }
    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };
    if (map.current.getSource("route")) {
      map.current.getSource("route").setData(geojson);
    } else {
      map.current.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: geojson,
            },
          },
        },
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
  },
  [accomodationLng, accomodationLat]
);

// if (map.current) return;

useEffect(() => {
  map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: "mapbox://styles/mapbox/streets-v11",
    center: [accomodationLng, accomodationLat],
    zoom: zoom,
    scrollZoom: false,
  });
  let routeStopCoordinates = [];
  const addStopAndSetMarker = (place_id, type) => {
    // console.log(place_id);
    const rawDataEquivalent = tripData.rawDataPlaces.find(
      (item) => item.place_id === place_id
    );

    const markerCoords = [
      rawDataEquivalent.geometry.location.lng,
      rawDataEquivalent.geometry.location.lat,
    ];
    //console.log(rawDataEquivalent);
    //routeStopCoordinates.push(markerCoords);
    console.log(routeStopCoordinates);
    setRouteCoordinates([
      ...routeCoordinates,
      markerCoords[0],
      markerCoords[1],
    ]);

    const marker = new mapboxgl.Marker({
      color: theme.palette.primary.light,
      draggable: false,
      scale: 0.5,
      markerSymbol: 1,
    })
      .setLngLat(markerCoords)
      .setPopup(new mapboxgl.Popup().setHTML(rawDataEquivalent.name))
      .addTo(map.current);
  };

  if (type === "SingleDay") {
    for (let location of tripData.trip[day - 1].locations) {
      addStopAndSetMarker(location.place_id, type);
    }
    console.log(routeCoordinates);
  }

  if (type === "TripSummary") {
    for (let dayIndex of tripData.trip) {
      addStopAndSetMarker(dayIndex.highlights.place_id, type);
    }
  }

  // fetching the Mapbox Directions API
}, [
  accomodationLng,
  accomodationLat,
  day,
  tripData.trip,
  type,
  fetchRoute,
  theme.palette.primary.light,
  tripData.rawDataPlaces,
]);

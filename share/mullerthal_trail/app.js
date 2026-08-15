const LUXEMBOURG_BOUNDS = L.latLngBounds(
  [49.38353327220212, 5.606928561467639],
  [50.28391517911171, 6.72934227271422],
);
const FIREPLACE_COLOR = "#39734f";
const PICNIC_COLOR = "#d4a129";
const TRAIL_COLORS = {
  "Route 1": "#2667a8",
  "Route 2": "#d07a18",
  "Route 3": "#744c9e",
  "ExtraTour A": "#c03d59",
  "ExtraTour B": "#168a96",
  "ExtraTour C": "#9b6b27",
  "ExtraTour D": "#d04f9a",
  "ExtraTour E": "#4d5fc1",
};
const TRAIL_DETAILS = {
  "Route 1": {
    distance: "36.74 km",
    duration: "10:25 h",
    difficulty: "Moderate",
    ascent: "745 m",
    url: "https://www.mullerthal.lu/fr/tour/sentier-pedestre-en-etapes-mullerthal-trail-route-1",
  },
  "Route 2": {
    distance: "39.65 km",
    duration: "12:50 h",
    difficulty: "Difficult",
    ascent: "947 m",
    url: "https://www.mullerthal.lu/fr/tour/sentier-pedestre-en-etapes-mullerthal-trail-route-2",
  },
  "Route 3": {
    distance: "37.69 km",
    duration: "11:05 h",
    difficulty: "Difficult",
    ascent: "686 m",
    url: "https://www.mullerthal.lu/fr/tour/sentier-pedestre-en-etapes-mullerthal-trail-route-3",
  },
  "ExtraTour A": {
    distance: "22.75 km",
    duration: "6:50 h",
    difficulty: "Moderate",
    ascent: "493 m",
    url: "https://www.mullerthal.lu/fr/tour/sentier-pedestre-en-etapes-mullerthaltrail-extratour-a",
  },
  "ExtraTour B": {
    distance: "12.98 km",
    duration: "3:45 h",
    difficulty: "Moderate",
    ascent: "268 m",
    url: "https://www.mullerthal.lu/fr/tour/sentier-pedestre-en-etapes-mullerthal-trail-extratour-b",
  },
  "ExtraTour C": {
    distance: "9.34 km",
    duration: "2:45 h",
    difficulty: "Moderate",
    ascent: "201 m",
    url: "https://www.mullerthal.lu/fr/tour/sentier-pedestre-en-etapes-extratour-c",
  },
  "ExtraTour D": {
    distance: "31.50 km",
    duration: "8:50 h",
    difficulty: "Difficult",
    ascent: "568 m",
    url: "https://www.mullerthal.lu/fr/tour/sentier-pedestre-en-etapes-mullerthaltrail-extratour-d",
  },
  "ExtraTour E": {
    distance: "25.46 km",
    duration: "7:20 h",
    difficulty: "Difficult",
    ascent: "433 m",
    url: "https://www.mullerthal.lu/fr/tour/mullerthal-trail-extratour-e",
  },
};

const map = L.map("map", {
  center: [49.805, 6.3],
  zoom: 12,
  minZoom: 9,
  maxZoom: 19,
  maxBounds: LUXEMBOURG_BOUNDS.pad(0.3),
  zoomControl: true,
});

map.createPane("forests").style.zIndex = 350;
map.createPane("saturated-base").style.zIndex = 210;
map.createPane("trail-casing").style.zIndex = 405;
map.createPane("trails").style.zIndex = 410;
map.createPane("region-boundary").style.zIndex = 420;

const tileUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const tileOptions = {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>',
  maxZoom: 19,
};

L.tileLayer(
  tileUrl,
  { ...tileOptions, className: "desaturated-tiles" },
).addTo(map);

L.tileLayer(tileUrl, {
  ...tileOptions,
  pane: "saturated-base",
  attribution: "",
}).addTo(map);

let forestOpacity = 0.72;
function forestStyle(feature) {
  const isCommunal = feature.properties?.ownership === "communal";

  return {
    color: isCommunal ? "#467b4e" : "#245c3b",
    weight: 1,
    opacity: Math.min(1, forestOpacity + 0.15),
    fillColor: isCommunal ? "#71a970" : "#4d8b58",
    fillOpacity: forestOpacity,
  };
}

const forestLayer = L.geoJSON(null, {
  pane: "forests",
  interactive: false,
  style: forestStyle,
}).addTo(map);

const trailCasingLayer = L.geoJSON(null, {
  pane: "trail-casing",
  interactive: false,
  style: {
    color: "#fffdf8",
    lineCap: "round",
    lineJoin: "round",
    opacity: 0.95,
    weight: 7,
  },
}).addTo(map);

function trailPopup(feature) {
  const name = feature.properties.route_name;
  const details = TRAIL_DETAILS[name];

  return `
    <article class="trail-popup">
      <span class="popup-eyebrow">Mullerthal Trail</span>
      <strong><i style="background:${TRAIL_COLORS[name]}"></i>${escapeHtml(name)}</strong>
      <dl>
        <div><dt>Length</dt><dd>${details.distance}</dd></div>
        <div><dt>Duration</dt><dd>${details.duration}</dd></div>
        <div><dt>Difficulty</dt><dd>${details.difficulty}</dd></div>
        <div><dt>Ascent</dt><dd>${details.ascent}</dd></div>
      </dl>
      <a href="${details.url}" target="_blank" rel="noreferrer">View on mullerthal.lu &rsaquo;</a>
    </article>
  `;
}

let pinnedTrail = null;
const trailLayer = L.geoJSON(null, {
  pane: "trails",
  style: (feature) => ({
    color: TRAIL_COLORS[feature.properties.route_name],
    weight: 3.5,
    opacity: 0.9,
  }),
  onEachFeature(feature, layer) {
    layer.bindPopup(trailPopup(feature), {
      className: "trail-leaflet-popup",
      closeButton: true,
      maxWidth: 290,
    });
    layer.on("mouseover", (event) => {
      if (!pinnedTrail) layer.openPopup(event.latlng);
    });
    layer.on("mouseout", () => {
      if (!pinnedTrail) layer.closePopup();
    });
    layer.on("click", (event) => {
      L.DomEvent.stopPropagation(event.originalEvent);
      pinnedTrail = layer;
      layer.openPopup(event.latlng);
    });
    layer.on("popupclose", () => {
      if (pinnedTrail === layer) pinnedTrail = null;
    });
  },
}).addTo(map);

const regionLayer = L.geoJSON(null, {
  pane: "region-boundary",
  interactive: false,
  style: {
    color: "#c9473b",
    dashArray: "3 7",
    fill: false,
    lineCap: "round",
    opacity: 0.95,
    weight: 3,
  },
}).addTo(map);

const mapStatus = document.querySelector("#map-status");

function escapeHtml(value) {
  const element = document.createElement("span");
  element.textContent = String(value);
  return element.innerHTML;
}

function createMarkerIcon(color) {
  return L.divIcon({
    className: "camp-marker",
    html: `<span class="camp-pin" style="background:${escapeHtml(color)}"></span>`,
    iconSize: [34, 42],
    iconAnchor: [17, 40],
    popupAnchor: [0, -36],
  });
}

function renderPlaces(places) {
  places.forEach((place) => {
    const marker = L.marker([place.latitude, place.longitude], {
      icon: createMarkerIcon(place.color),
      title: place.name,
    }).addTo(map);

    marker.bindPopup(`
      <span class="popup-eyebrow">${place.hasFireplace ? "Fireplace" : "Picnic spot"}</span>
      <strong>${escapeHtml(place.name)}</strong>
      <small>${place.hasFireplace ? "Fireplace available" : "No fireplace"} &middot; ${place.latitude.toFixed(5)}, ${place.longitude.toFixed(5)}</small>
    `);
  });
}

async function loadPlaces() {
  try {
    const response = await fetch("mullerthal_spots.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const rows = await response.json();
    if (!Array.isArray(rows)) throw new Error("Expected an array of places");

    const places = rows.map((row, index) => {
      if (
        !Array.isArray(row) ||
        row.length !== 4 ||
        !Number.isFinite(row[0]) ||
        !Number.isFinite(row[1]) ||
        typeof row[2] !== "string" ||
        typeof row[3] !== "boolean"
      ) {
        throw new Error(`Invalid place at index ${index}`);
      }

      return {
        id: `mullerthal-${index}`,
        latitude: row[0],
        longitude: row[1],
        name: row[2],
        hasFireplace: row[3],
        color: row[3] ? FIREPLACE_COLOR : PICNIC_COLOR,
      };
    });

    renderPlaces(places);

    if (places.length > 0) {
      map.fitBounds(
        L.latLngBounds(places.map((place) => [place.latitude, place.longitude])),
        { padding: [35, 35], maxZoom: 13 },
      );
    }
  } catch (error) {
    console.error("Could not load camping points:", error);
    mapStatus.textContent = "The camping points could not be loaded.";
    mapStatus.hidden = false;
  }
}

async function loadForests() {
  try {
    const response = await fetch("data/public_forests_mullerthal.geojson");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const forests = await response.json();
    forests.features.forEach((feature) => {
      const owner = feature.properties?.prie_denom ?? "";
      feature.properties.ownership = owner.includes(",CNE.")
        ? "communal"
        : "domaine";
    });
    forestLayer.addData(forests);
  } catch (error) {
    console.error("Could not load public forests:", error);
    mapStatus.textContent = "The local public forest polygons could not be loaded.";
    mapStatus.hidden = false;
  }
}

function getTrailName(name) {
  const match = name.match(/(Route [123]|Extra Tour [A-E])/i);
  if (!match) return name;

  return match[1]
    .replace(/Extra Tour/i, "ExtraTour")
    .replace(/Route/i, "Route");
}

function setSaturatedRegionClip(region) {
  const coordinates = region.features[0].geometry.coordinates[0];
  const pane = map.getPane("saturated-base");

  function updateClip() {
    const paneOffset = map._getMapPanePos();
    const points = coordinates.map(([longitude, latitude]) => {
      const point = map.latLngToContainerPoint([latitude, longitude]);
      return `${point.x - paneOffset.x}px ${point.y - paneOffset.y}px`;
    });
    pane.style.clipPath = `polygon(${points.join(",")})`;
  }

  updateClip();
  map.on("move zoom resize", updateClip);
}

async function loadMapFeatures() {
  try {
    const [regionResponse, trailsResponse] = await Promise.all([
      fetch("data/mullerthal_region.geojson"),
      fetch("data/mullerthal_trails.geojson"),
    ]);

    if (!regionResponse.ok) throw new Error(`Region HTTP ${regionResponse.status}`);
    if (!trailsResponse.ok) throw new Error(`Trails HTTP ${trailsResponse.status}`);

    const [region, trails] = await Promise.all([
      regionResponse.json(),
      trailsResponse.json(),
    ]);

    trails.features.forEach((feature) => {
      feature.properties.route_name = getTrailName(feature.properties.name);
    });

    regionLayer.addData(region);
    setSaturatedRegionClip(region);
    trailCasingLayer.addData(trails);
    trailLayer.addData(trails);
  } catch (error) {
    console.error("Could not load region or trails:", error);
    mapStatus.textContent = "The local Mullerthal boundary or trails could not be loaded.";
    mapStatus.hidden = false;
  }
}

map.on("click", () => {
  pinnedTrail = null;
  map.closePopup();
});

loadPlaces();
loadForests();
loadMapFeatures();

// worldmap.js — Leaflet-based interactive world map for Alarkdum.
//
// Coordinate convention used in markers.js:
//   [imageY, imageX] where imageY is measured in pixels from the TOP of the world map image.
// We convert to Leaflet's internal y-up system for display, and invert on clicks in edit mode.

(function () {
  const MAP_IMAGE  = "Images/Maps/alarkdum-world-map.jpg";
  const MAP_WIDTH  = 2048;
  const MAP_HEIGHT = 924;

  // Convert [imageY, imageX] (top-down) to Leaflet [y, x] (bottom-up)
  function toLeaflet([imageY, imageX]) {
    return [MAP_HEIGHT - imageY, imageX];
  }
  // Convert a Leaflet click back to [imageY, imageX] (top-down)
  function fromLeaflet(latlng) {
    return [Math.round(MAP_HEIGHT - latlng.lat), Math.round(latlng.lng)];
  }

  const map = L.map("map", {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxZoom: 2,
    zoomControl: true,
    attributionControl: false,
    zoomSnap: 0.25
  });

  const bounds = [[0, 0], [MAP_HEIGHT, MAP_WIDTH]];
  L.imageOverlay(MAP_IMAGE, bounds).addTo(map);
  map.fitBounds(bounds);
  map.setMaxBounds(bounds);

  // Render all markers from Database/markers.js
  (window.mapMarkers || []).forEach((m) => {
    const marker = L.marker(toLeaflet(m.coords), { title: m.name }).addTo(map);

    const parts = [];
    parts.push(`<h3 class="popup-title">${m.title || m.name}</h3>`);
    if (m.thematic) {
      parts.push(`<img class="popup-thematic" src="${m.thematic}" alt="${m.name}">`);
    }
    if (m.description) {
      parts.push(`<div class="popup-description">${m.description}</div>`);
    }
    if (m.cityMap) {
      parts.push(
        `<a href="${m.cityMap}" target="_blank" rel="noopener">` +
        `<img class="popup-citymap" src="${m.cityMap}" alt="${m.name} city map">` +
        `<div class="popup-hint">Click map to open full size</div></a>`
      );
    }

    marker.bindPopup(`<div class="marker-popup">${parts.join("")}</div>`, {
      maxWidth: 420,
      minWidth: 280,
      autoPanPadding: [40, 40]
    });
  });

  // Edit mode — toggle with ?edit=1 in the URL
  const editing = new URLSearchParams(location.search).get("edit") === "1";
  if (editing) {
    const panel = document.getElementById("edit-panel");
    const coordsEl = document.getElementById("coords");
    if (panel) panel.style.display = "block";

    // Drop a temporary marker where the user clicks so they can see where their coords point.
    let ghost = null;
    map.on("click", (e) => {
      const [y, x] = fromLeaflet(e.latlng);
      if (coordsEl) coordsEl.textContent = `coords: [${y}, ${x}]`;
      if (ghost) ghost.remove();
      ghost = L.circleMarker(e.latlng, {
        radius: 8,
        color: "#ff3b30",
        weight: 3,
        fillColor: "#ff3b30",
        fillOpacity: 0.4
      }).addTo(map);
    });
  }
})();

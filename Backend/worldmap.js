// worldmap.js — Leaflet-based interactive world map for Alarkdum.
//
// Coordinate convention used in markers.js:
//   [imageY, imageX] where imageY is measured in pixels from the TOP of the world map image.
// We convert to Leaflet's internal y-up system for display, and invert on clicks in edit mode.
//
// Clicking a marker opens a left-side info panel (like World Anvil) instead of a
// Leaflet popup, so we can fit large descriptions without overflowing the screen.

(function () {
  const MAP_IMAGE  = "Images/Maps/alarkdum-world-map.jpg";
  const MAP_WIDTH  = 2048;
  const MAP_HEIGHT = 924;

  function toLeaflet([imageY, imageX]) {
    return [MAP_HEIGHT - imageY, imageX];
  }
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

  // ---- Side info panel ----
  const panel     = document.getElementById("info-panel");
  const panelBody = document.getElementById("info-panel-body");
  const panelClose = document.getElementById("info-panel-close");

  // ---- Full-screen image lightbox ----
  // Built once and reused. Click anywhere on the overlay or press Escape to close.
  const lightbox = document.createElement("div");
  lightbox.className = "thematic-lightbox";
  lightbox.innerHTML = '<img alt="">';
  document.body.appendChild(lightbox);
  const lightboxImg = lightbox.querySelector("img");

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add("open");
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
  }
  lightbox.addEventListener("click", closeLightbox);

  function openPanelFor(m) {
    const parts = [];
    if (m.thematic) {
      parts.push(`<img class="info-thematic" src="${m.thematic}" alt="${m.name}">`);
    }
    parts.push(`<div class="info-content">`);
    parts.push(`<h2 class="info-title">${m.title || m.name}</h2>`);
    if (m.description) {
      parts.push(`<div class="info-description">${m.description}</div>`);
    }
    if (m.cityMap) {
      parts.push(
        `<img class="info-citymap" src="${m.cityMap}" alt="${m.name} city map">` +
        `<div class="info-hint">Click map to enlarge</div>`
      );
    }
    parts.push(`</div>`);

    panelBody.innerHTML = parts.join("");
    panelBody.scrollTop = 0;
    panel.classList.add("open");
    document.body.classList.add("panel-open");

    // Wire enlarge-on-click for any images inside the panel.
    panelBody.querySelectorAll(".info-thematic, .info-citymap").forEach((img) => {
      img.addEventListener("click", () => openLightbox(img.src));
    });
  }

  function closePanel() {
    panel.classList.remove("open");
    document.body.classList.remove("panel-open");
  }

  if (panelClose) panelClose.addEventListener("click", closePanel);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // Lightbox closes first if it's open; otherwise close the side panel.
      if (lightbox.classList.contains("open")) {
        closeLightbox();
      } else {
        closePanel();
      }
    }
  });

  // ---- Markers ----
  // L.circleMarker draws a small SVG dot instead of the default tall pin so
  // it doesn't cover biome labels. Hovering shows the city's name as a tooltip.
  (window.mapMarkers || []).forEach((m) => {
    const marker = L.circleMarker(toLeaflet(m.coords), {
      radius: 8,
      weight: 2,
      color: "#ffffff",
      fillColor: "#ff5252",
      fillOpacity: 0.95,
      className: "world-marker"
    }).addTo(map);
    marker.bindTooltip(m.name, {
      direction: "top",
      offset: [0, -10],
      className: "world-marker-tooltip"
    });
    marker.on("click", () => openPanelFor(m));
  });

  // ---- Edit mode (?edit=1) ----
  const editing = new URLSearchParams(location.search).get("edit") === "1";

  // ---- Secret edit-mode button on the compass (hover to reveal) ----
  // Only show when NOT already in edit mode. Tweak COMPASS_COORDS [imageY, imageX]
  // to line up with the center of the compass rose on the map image.
  if (!editing) {
    const COMPASS_COORDS = [111, 111];
    const compassIcon = L.divIcon({
      className: "compass-edit-btn",
      html: '<div class="compass-edit-hotspot"></div>',
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });
    const compassMarker = L.marker(toLeaflet(COMPASS_COORDS), {
      icon: compassIcon,
      interactive: true,
      keyboard: false
    }).addTo(map);
    compassMarker.on("click", () => {
      window.location.href = "worldmap.html?edit=1";
    });
  }

  if (editing) {
    const editPanel = document.getElementById("edit-panel");
    const coordsEl  = document.getElementById("coords");
    if (editPanel) editPanel.style.display = "block";

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

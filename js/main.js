// ===============================
// JS PRINCIPAL - Argentina Aventura Familiar de 30 Días
// ===============================

// ========== TABLA DE TRANSPORTE ENTRE CIUDADES ==========

const TRANSPORTE = [
  {
    desde: "Buenos Aires",
    hasta: "Rosario",
    medio: "Bus",
    tiempo: "4:30 h",
    precio: "ARS 12.000",
    compania: '<a href="https://www.busbud.com/es/bus-companies/chevallier" target="_blank">Chevallier</a>'
  },
  {
    desde: "Rosario",
    hasta: "Bariloche",
    medio: "Vuelo",
    tiempo: "2:30 h",
    precio: "USD 120",
    compania: '<a href="https://www.aerolineas.com.ar/" target="_blank">Aerolíneas Argentinas</a>'
  },
  {
    desde: "Bariloche",
    hasta: "Mendoza",
    medio: "Vuelo",
    tiempo: "2:00 h",
    precio: "USD 130",
    compania: '<a href="https://www.aerolineas.com.ar/" target="_blank">Aerolíneas Argentinas</a>'
  },
  {
    desde: "Mendoza",
    hasta: "Malargüe",
    medio: "Bus",
    tiempo: "5:00 h",
    precio: "ARS 10.000",
    compania: '<a href="https://www.cata.com.ar/" target="_blank">CATA Internacional</a>'
  },
  {
    desde: "Malargüe",
    hasta: "Jujuy",
    medio: "Vuelo + Bus",
    tiempo: "10:00 h (via Mendoza/Salta)",
    precio: "USD 200",
    compania: '<a href="https://www.aerolineas.com.ar/" target="_blank">Aerolíneas Argentinas</a> + Bus'
  },
  {
    desde: "Jujuy",
    hasta: "Iguazú",
    medio: "Vuelo",
    tiempo: "2:00 h (escala Buenos Aires)",
    precio: "USD 140",
    compania: '<a href="https://www.aerolineas.com.ar/" target="_blank">Aerolíneas Argentinas</a>'
  },
  {
    desde: "Iguazú",
    hasta: "Corrientes",
    medio: "Bus",
    tiempo: "8:00 h",
    precio: "ARS 10.000",
    compania: '<a href="https://www.crucerodelnorte.com.ar/" target="_blank">Crucero del Norte</a>'
  },
  {
    desde: "Corrientes",
    hasta: "Iberá",
    medio: "Bus/Transfer",
    tiempo: "5:00 h",
    precio: "ARS 7.000",
    compania: 'Transfer local'
  },
  {
    desde: "Iberá",
    hasta: "Buenos Aires",
    medio: "Bus nocturno",
    tiempo: "11:00 h",
    precio: "ARS 18.000",
    compania: '<a href="https://www.eldoradobus.com.ar/" target="_blank">El Dorado Bus</a>'
  }
];

function renderTablaTransporte() {
  const tbody = document.querySelector('#tabla-transporte tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  TRANSPORTE.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.desde}</td>
      <td>${row.hasta}</td>
      <td>${row.medio}</td>
      <td>${row.tiempo}</td>
      <td>${row.precio}</td>
      <td>${row.compania}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.addEventListener('DOMContentLoaded', renderTablaTransporte);

// ========== NAVEGACIÓN DE TARJETAS DE CIUDAD (EXPLORAR MÁS DETALLES) ==========

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".btn-visit").forEach(function(btn) {
    btn.addEventListener("click", function() {
      const page = btn.getAttribute("data-page");
      if (page) window.location.href = page;
    });
  });
});

// ========== MAPA INTERACTIVO ==========

document.addEventListener("DOMContentLoaded", function() {
  if (typeof L === "undefined") return; // Leaflet no cargado

  const map = L.map('map').setView([-34.5, -63], 4.2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const destinations = [
    { name: 'Buenos Aires', coords: [-34.6118, -58.3960] },
    { name: 'Rosario', coords: [-32.9442, -60.6505] },
    { name: 'Bariloche', coords: [-41.1335, -71.3103] },
    { name: 'Mendoza', coords: [-32.8908, -68.8272] },
    { name: 'Malargüe', coords: [-35.4757, -69.5840] },
    { name: 'Jujuy', coords: [-24.1858, -65.2995] },
    { name: 'Iguazú', coords: [-25.5952, -54.5732] },
    { name: 'Corrientes', coords: [-27.4691, -58.8309] },
    { name: 'Iberá', coords: [-28.2649, -57.4316] }
  ];

  destinations.forEach(dest => {
    L.marker(dest.coords).addTo(map)
      .bindPopup(dest.name);
  });
});

// ========== OTROS MÓDULOS INTERACTIVOS (ejemplo: lista de equipaje, IA, conversor de moneda) ==========
// Agrega tus módulos interactivos aquí según los lineamientos del promp/README.

// ========== FIN ==========

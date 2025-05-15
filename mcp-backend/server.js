// mcp-backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Importa las rutas de itinerario
const itineraryRoutes = require('./routes/itinerary');
app.use('/mcp/itinerary', itineraryRoutes);

// Importa las rutas de vuelos (nuevo módulo)
const flightsRoutes = require('./routes/flights');
app.use('/mcp/flights', flightsRoutes);

app.listen(3001, () => console.log('MCP backend escuchando en puerto 3001'));

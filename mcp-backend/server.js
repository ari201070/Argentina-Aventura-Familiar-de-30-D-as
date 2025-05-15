// mcp-backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const itineraryRoutes = require('./routes/itinerary');
app.use('/mcp/itinerary', itineraryRoutes);

app.listen(3001, () => console.log('MCP backend escuchando en puerto 3001'));

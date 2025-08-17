// mcp-backend/server.js
const express = require('express');
const app = express();
const itineraryRoutes = require('./routes/itinerary');

app.use(express.json());
app.use('/api/itinerary', itineraryRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor MCP escuchando en el puerto ${PORT}`);
});

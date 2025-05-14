// mcp-backend/routes/itinerary.js
const express = require('express');
const router = express.Router();
const { generarItinerario } = require('../agents/itineraryAgent');

router.post('/', (req, res) => {
  const datos = req.body;
  const itinerario = generarItinerario(datos);
  res.json(itinerario);
});

module.exports = router;

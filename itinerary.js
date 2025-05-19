// mcp-backend/routes/itinerary.js
const express = require('express');
const router = express.Router();
const itineraryAgent = require('../agents/itineraryAgent');

router.post('/generate', async (req, res) => {
  const { fechas, ciudades, preferencias, idioma, moneda } = req.body;
  const itinerario = await itineraryAgent.generarItinerario({ fechas, ciudades, preferencias, idioma, moneda });
  res.json(itinerario);
});

module.exports = router;

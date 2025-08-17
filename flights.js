// mcp-backend/routes/flights.js
const express = require('express');
const router = express.Router();
const flightsAgent = require('../agents/flightsAgent');

// Endpoint para crear alerta de precio
router.post('/watch_price', async (req, res) => {
  const { from, to, departure, returnDate, price_threshold, notification_email } = req.body;
  const result = await flightsAgent.watchPrice({ from, to, departure, returnDate, price_threshold, notification_email });
  res.json(result);
});

// Endpoint para listar alertas (opcional)
router.get('/alerts', (req, res) => {
  res.json(flightsAgent.getAlerts());
});

module.exports = router;

// mcp-backend/routes/currency.js
const express = require('express');
const router = express.Router();
const currencyAgent = require('../agents/currencyAgent');

// GET /mcp/currency/convert?from=USD&to=ARS&amount=100
router.get('/convert', (req, res) => {
  const { from, to, amount } = req.query;
  const result = currencyAgent.convert({ from, to, amount: Number(amount) });
  res.json(result);
});

module.exports = router;

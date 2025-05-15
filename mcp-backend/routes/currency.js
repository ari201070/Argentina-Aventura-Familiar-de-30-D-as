const express = require('express');
const router = express.Router();
const currencyAgent = require('../agents/currencyAgent');

router.get('/convert', async (req, res) => {
  const { from, to, amount } = req.query;
  const result = await currencyAgent.convert({ from, to, amount: Number(amount) });
  res.json(result);
});

module.exports = router;

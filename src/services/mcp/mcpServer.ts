// src/services/mcp/mcpServer.ts

import express from 'express';
import { askGemini, convertCurrency } from '../apiService';
import { Language } from '../types';

const app = express();
app.use(express.json());

// Ejemplo de herramienta MCP para conversión de moneda
app.post('/tool/convertCurrency', async (req, res) => {
  const { amount, from, to } = req.body;
  const result = await convertCurrency(amount, from, to);
  if (result !== null) {
    res.json({ result });
  } else {
    res.status(500).json({ error: "Could not convert currency." });
  }
});

// Ejemplo de herramienta MCP para consulta a IA
app.post('/tool/askAI', async (req, res) => {
  const { prompt, language } = req.body;
  const answer = await askGemini(prompt, language);
  res.json({ answer });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MCP Server running on http://localhost:${PORT}`);
});

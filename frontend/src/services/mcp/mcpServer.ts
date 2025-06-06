// src/services/mcp/mcpServer.ts
// This server's functionalities have been largely migrated to client-side MCP modules.
// - Currency conversion is handled by frontend/src/context/MonedaContext.jsx
// - AI queries are handled by frontend/src/services/mcp/aiService.js

import express from 'express';
// import { askGemini, convertCurrency } from '../apiService';
// import { askGemini } from '../apiService'; // convertCurrency removed as it's no longer used
// import { Language } from '../types'; // Language type is no longer used here

const app = express();
app.use(express.json());

// The /tool/convertCurrency endpoint has been superseded by a client-side MCP implementation
// in frontend/src/context/MonedaContext.jsx.
/*
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
*/

// The /tool/askAI endpoint is being deprecated in favor of a client-side MCP approach
// in frontend/src/services/mcp/aiService.js. This service currently provides mock responses
// and would be the location for any future real AI API integration and caching.
/*
// Ejemplo de herramienta MCP para consulta a IA
app.post('/tool/askAI', async (req, res) => {
  const { prompt, language } = req.body;
  const answer = await askGemini(prompt, language);
  res.json({ answer });
});
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MCP Server running on http://localhost:${PORT}`);
});

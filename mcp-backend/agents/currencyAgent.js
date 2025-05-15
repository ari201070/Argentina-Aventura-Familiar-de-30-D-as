// mcp-backend/agents/currencyAgent.js

// Tasas de cambio simuladas (puedes actualizar o conectar a una API real)
const tasas = {
  "USD_ARS": 900,
  "USD_ILS": 3.6,
  "ARS_USD": 1/900,
  "ARS_ILS": 3.6/900,
  "ILS_USD": 1/3.6,
  "ILS_ARS": 900/3.6
};

module.exports.convert = function({ from, to, amount }) {
  if (from === to) return { result: amount, tasa: 1 };
  const key = `${from}_${to}`;
  const tasa = tasas[key];
  if (!tasa) return { error: "Conversión no soportada" };
  return { result: amount * tasa, tasa };
};

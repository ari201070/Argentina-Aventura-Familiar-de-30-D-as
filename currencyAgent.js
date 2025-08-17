// mcp-backend/agents/currencyAgent.js
const fetch = require("node-fetch");

module.exports.convert = async function({ from, to, amount }) {
  if (from === to) return { result: amount, tasa: 1 };
  const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return { result: data.result, tasa: data.info.rate };
  } catch (e) {
    return { error: "Error consultando tasa de cambio" };
  }
};

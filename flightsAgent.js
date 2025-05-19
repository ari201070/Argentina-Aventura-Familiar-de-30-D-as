// mcp-backend/agents/flightsAgent.js
let alertas = [];

module.exports.watchPrice = async function({ from, to, departure, returnDate, price_threshold, notification_email }) {
  // Simula guardar la alerta
  alertas.push({ from, to, departure, returnDate, price_threshold, notification_email });
  return { ok: true, mensaje: "Alerta registrada correctamente." };
};

module.exports.getAlerts = function() {
  return alertas;
};

// mcp-backend/agents/itineraryAgent.js
module.exports.generarItinerario = async function({ fechas, ciudades, preferencias, idioma, moneda }) {
  // Aquí se puede usar lógica simple, IA, APIs externas, etc.
  // Por ahora, devolvemos un ejemplo estático:
  return {
    ciudades: ciudades,
    dias: [
      {
        fecha: fechas[0],
        ciudad: ciudades[0],
        actividades: [
          { nombre: "City tour", tipo: "cultural", precio: "ARS 10,000" },
          { nombre: "Cena en parrilla", tipo: "gastronomía", precio: "ARS 5,000" }
        ]
      }
    ]
  };
};

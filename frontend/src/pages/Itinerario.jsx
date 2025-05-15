// frontend/src/pages/itinerario.jsx
import React, { useState } from 'react';

export default function Itinerario() {
  const [form, setForm] = useState({
    fechas: ["2025-09-28", "2025-11-02"],
    ciudades: ["Buenos Aires", "Mendoza"],
    preferencias: ["naturaleza"],
    idioma: "es",
    moneda: "ARS"
  });
  const [itinerario, setItinerario] = useState(null);

  const generar = async () => {
    const res = await fetch('http://localhost:3001/mcp/itinerary/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setItinerario(await res.json());
  };

  return (
    <div>
      <h1>Itinerario de viaje</h1>
      <button onClick={generar}>Generar itinerario</button>
      {itinerario && (
        <div>
          {itinerario.dias.map((dia, i) => (
            <div key={i}>
              <h3>{dia.fecha} - {dia.ciudad}</h3>
              <ul>
                {dia.actividades.map((a, j) => (
                  <li key={j}>{a.nombre} ({a.tipo}) - {a.precio}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

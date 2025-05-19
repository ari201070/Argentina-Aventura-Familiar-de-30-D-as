import React, { useState, useEffect } from 'react';
import { useMoneda } from '../context/MonedaContext';

export default function Itinerario() {
  const [form, setForm] = useState({
    fechas: ["2025-09-28", "2025-11-02"],
    ciudades: ["Buenos Aires", "Mendoza"],
    preferencias: ["naturaleza"],
    idioma: "es",
    moneda: "ARS"
  });
  const [itinerario, setItinerario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { moneda, tasas, loading: tasaLoading } = useMoneda();

  const [itinerarioConvertido, setItinerarioConvertido] = useState(null);

  const generar = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch('http://localhost:3001/mcp/itinerary/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Error generando itinerario");
      const data = await res.json();
      setItinerario(data);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  // Convierte precios cuando cambia el itinerario o la moneda
  useEffect(() => {
    if (!itinerario) {
      setItinerarioConvertido(null);
      return;
    }
    if (moneda === "ARS") {
      setItinerarioConvertido(itinerario);
      return;
    }
    if (!tasas[moneda]) {
      setItinerarioConvertido(itinerario);
      return;
    }
    // Copia el itinerario y convierte los precios usando la tasa cacheada
    const nuevoItinerario = {
      ...itinerario,
      dias: itinerario.dias.map(dia => ({
        ...dia,
        actividades: dia.actividades.map(act => {
          const monto = Number(act.precio.replace(/[^\d.]/g, ""));
          const montoConvertido = monto * tasas[moneda];
          return {
            ...act,
            precio: `${montoConvertido.toFixed(2)} ${moneda}`
          };
        })
      }))
    };
    setItinerarioConvertido(nuevoItinerario);
  }, [itinerario, moneda, tasas]);

  return (
    <div>
      <h1>Itinerario de viaje</h1>
      <button onClick={generar} disabled={loading}>
        {loading ? "Generando..." : "Generar itinerario"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {tasaLoading && <p>Actualizando tasas de cambio...</p>}
      {itinerarioConvertido && (
        <div>
          {itinerarioConvertido.dias.map((dia, i) => (
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
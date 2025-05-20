import React, { useState, useEffect } from 'react';
import { useMoneda } from '../context/MonedaContext';

// Constante para el estado inicial del formulario
const defaultFormState = {
  fechas: ["2025-09-28", "2025-11-02"],
  ciudades: ["Buenos Aires", "Mendoza"],
  preferencias: ["naturaleza"],
  idioma: "es",
  moneda: "ARS"
};

// Función auxiliar para la conversión de moneda
const convertCurrency = (itinerario, moneda, tasas) => {
  if (!itinerario || moneda === "ARS" || !tasas[moneda]) {
    return itinerario;
  }

  return {
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
};

export default function Itinerario() {
  const [form, setForm] = useState(defaultFormState);
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
      if (!res.ok) {
        // Mejor manejo de errores, mostrando mensaje del backend si existe
        const errorDetails = await res.json();
        throw new Error(errorDetails.message || "Error generando itinerario");
      }
      const data = await res.json();
      setItinerario(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      setItinerarioConvertido(convertCurrency(itinerario, moneda, tasas));
    } catch (error) {
      console.error("Error al convertir moneda:", error);
      setItinerarioConvertido(itinerario); // Fallback al itinerario original
    }
  }, [itinerario, moneda, tasas]);

  return (
    <div>
      <h1>Itinerario de viaje</h1>
      <button onClick={generar} disabled={loading || tasaLoading}>
        {loading || tasaLoading ? "Cargando..." : "Generar itinerario"}
      </button>
      {error && <p className="error-message">{error}</p>}
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
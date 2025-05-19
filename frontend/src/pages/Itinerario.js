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
  const { moneda } = useMoneda();

  // Convierte todos los precios de las actividades del itinerario
  const [itinerarioConvertido, setItinerarioConvertido] = useState(null);

  const generar = async () => {
    const res = await fetch('http://localhost:3001/mcp/itinerary/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setItinerario(data);
  };

  // Convierte precios cuando cambia el itinerario o la moneda
  useEffect(() => {
    async function convertirPrecios() {
      if (!itinerario || moneda === "ARS") {
        setItinerarioConvertido(itinerario);
        return;
      }
      // Copia el itinerario y convierte los precios
      const nuevoItinerario = {
        ...itinerario,
        dias: await Promise.all(itinerario.dias.map(async dia => ({
          ...dia,
          actividades: await Promise.all(dia.actividades.map(async act => {
            // Extrae el monto numérico del string de precio
            const monto = Number(act.precio.replace(/[^\d.]/g, ""));
            const res = await fetch(`http://localhost:3001/mcp/currency/convert?from=ARS&to=${moneda}&amount=${monto}`);
            const data = await res.json();
            return {
              ...act,
              precio: `${data.result ? data.result.toFixed(2) : "?"} ${moneda}`
            };
          }))
        })))
      };
      setItinerarioConvertido(nuevoItinerario);
    }
    convertirPrecios();
  }, [itinerario, moneda]);

  return (
    <div>
      <h1>Itinerario de viaje</h1>
      <button onClick={generar}>Generar itinerario</button>
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

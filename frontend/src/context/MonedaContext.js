import React, { createContext, useContext, useState, useEffect } from "react";

// Creamos el contexto
const MonedaContext = createContext();

// Provider extendido
export function MonedaProvider({ children }) {
  const [moneda, setMoneda] = useState("ARS");
  const [tasas, setTasas] = useState({}); // Ejemplo: { USD: 0.0011, EUR: 0.00095 }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Al cambiar la moneda, si no está cacheada, trae la tasa de cambio
  useEffect(() => {
    async function fetchTasa() {
      if (moneda === "ARS" || tasas[moneda]) return; // Si es ARS o ya está cacheada, no hace nada
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`http://localhost:3001/mcp/currency/convert?from=ARS&to=${moneda}&amount=1`);
        const data = await res.json();
        if (data.result) {
          setTasas(prev => ({ ...prev, [moneda]: data.result }));
        } else {
          setError("No se pudo obtener la tasa de cambio.");
        }
      } catch (e) {
        setError("Error consultando la tasa de cambio.");
      }
      setLoading(false);
    }
    fetchTasa();
    // eslint-disable-next-line
  }, [moneda]);

  return (
    <MonedaContext.Provider value={{ moneda, setMoneda, tasas, loading, error }}>
      {children}
    </MonedaContext.Provider>
  );
}

// Hook para consumir el contexto
export function useMoneda() {
  return useContext(MonedaContext);
}
import React, { createContext, useContext, useState, useEffect } from "react";

const MonedaContext = createContext();

export function MonedaProvider({ children }) {
  const [moneda, setMoneda] = useState("ARS");
  const [tasas, setTasas] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTasa() {
      if (moneda === "ARS" || tasas[moneda]) return;
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

export function useMoneda() {
  return useContext(MonedaContext);
}
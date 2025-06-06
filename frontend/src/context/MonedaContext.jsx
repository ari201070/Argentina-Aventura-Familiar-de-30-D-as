import React, { createContext, useContext, useState, useEffect } from "react";

const MonedaContext = createContext();
const MCP_CURRENCY_RATES_KEY = "MCP_CURRENCY_RATES";
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export function MonedaProvider({ children }) {
  const [moneda, setMoneda] = useState("ARS");
  const [tasas, setTasas] = useState({ ARS: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadAndCacheRates = async () => {
    setLoading(true);
    setError("");

    // Try to load from localStorage
    try {
      const cachedDataString = localStorage.getItem(MCP_CURRENCY_RATES_KEY);
      if (cachedDataString) {
        const cachedData = JSON.parse(cachedDataString);
        const now = new Date().getTime();
        if (cachedData.timestamp && (now - new Date(cachedData.timestamp).getTime() < CACHE_DURATION_MS)) {
          // Cache is valid and fresh
          setTasas({ ARS: 1, ...cachedData.rates });
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.error("Error reading from localStorage", e);
      // Proceed to fetch if localStorage read fails
    }

    // If no valid cache, fetch from API
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/ARS');
      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }
      const data = await res.json();

      if (data && data.rates) {
        const newRates = { ARS: 1, ...data.rates };
        setTasas(newRates);
        try {
          localStorage.setItem(MCP_CURRENCY_RATES_KEY, JSON.stringify({
            timestamp: new Date().toISOString(),
            base: 'ARS',
            rates: data.rates,
          }));
        } catch (e) {
          console.error("Error saving to localStorage", e);
          setError("Rates fetched but could not be saved to local cache.");
        }
      } else {
        setError("No se pudo obtener la estructura esperada de tasas de cambio.");
        // Try to use stale cache if available
        const cachedDataString = localStorage.getItem(MCP_CURRENCY_RATES_KEY);
        if (cachedDataString) {
          const cachedData = JSON.parse(cachedDataString);
          if (cachedData && cachedData.rates) {
            setTasas({ ARS: 1, ...cachedData.rates });
            setError("Mostrando tasas de cambio desactualizadas. Error al actualizar.");
          }
        }
      }
    } catch (e) {
      console.error("Error fetching exchange rates:", e);
      // Try to use stale cache if available
      const cachedDataString = localStorage.getItem(MCP_CURRENCY_RATES_KEY);
      if (cachedDataString) {
        try {
          const cachedData = JSON.parse(cachedDataString);
          if (cachedData && cachedData.rates) {
            setTasas({ ARS: 1, ...cachedData.rates });
            setError("Mostrando tasas de cambio desactualizadas. Error al conectar con el servidor.");
            setLoading(false);
            return;
          }
        } catch (parseError) {
          console.error("Error parsing stale cache", parseError);
        }
      }
      setError("No se pudo obtener las tasas de cambio y no hay datos en caché disponibles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAndCacheRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Runs once on mount

  return (
    <MonedaContext.Provider value={{ moneda, setMoneda, tasas, loading, error, setError, loadAndCacheRates }}>
      {children}
    </MonedaContext.Provider>
  );
}

export function useMoneda() {
  return useContext(MonedaContext);
}
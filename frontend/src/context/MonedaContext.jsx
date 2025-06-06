import React, { createContext, useContext, useState, useEffect } from 'react';

// Crea el contexto
const MonedaContext = createContext();

// Hook personalizado para usar el contexto
export function useMoneda() {
  return useContext(MonedaContext);
}

// Proveedor del contexto de moneda
export function MonedaProvider({ children }) {
  const [moneda, setMoneda] = useState(localStorage.getItem('moneda') || 'ARS');

  useEffect(() => {
    localStorage.setItem('moneda', moneda);
  }, [moneda]);

  return (
    <MonedaContext.Provider value={{ moneda, setMoneda }}>
      {children}
    </MonedaContext.Provider>
  );
}

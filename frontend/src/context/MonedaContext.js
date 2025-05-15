import React, { createContext, useContext, useState } from "react";

const MonedaContext = createContext();

export function MonedaProvider({ children }) {
  const [moneda, setMoneda] = useState("ARS");
  return (
    <MonedaContext.Provider value={{ moneda, setMoneda }}>
      {children}
    </MonedaContext.Provider>
  );
}

export function useMoneda() {
  return useContext(MonedaContext);
}

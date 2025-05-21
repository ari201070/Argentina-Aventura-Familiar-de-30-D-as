import React, { createContext, useContext, useState } from "react";

// Idiomas y monedas soportados
const idiomasDisponibles = [
  { code: "ES", label: "Español" },
  { code: "HE", label: "עברית" },
];
const monedasDisponibles = ["ARS", "USD", "ILS"];

// Crear contexto
const AppSettingsContext = createContext();

export const AppSettingsProvider = ({ children }) => {
  const [idioma, setIdioma] = useState("ES");
  const [moneda, setMoneda] = useState("ARS");

  const cambiarIdioma = (nuevoIdioma) => setIdioma(nuevoIdioma);
  const cambiarMoneda = (nuevaMoneda) => setMoneda(nuevaMoneda);

  return (
    <AppSettingsContext.Provider
      value={{
        idioma,
        setIdioma: cambiarIdioma,
        idiomasDisponibles,
        moneda,
        setMoneda: cambiarMoneda,
        monedasDisponibles,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};

// Hook para consumir el contexto
export const useAppSettings = () => useContext(AppSettingsContext);
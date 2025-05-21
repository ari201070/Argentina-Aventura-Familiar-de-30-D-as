import React from "react";
import { AppSettingsProvider } from "./context/AppSettingsContext";
import Presupuesto from "./pages/Presupuesto";
// Importa otros componentes/rutas aquí

function App() {
  return (
    <AppSettingsProvider>
      {/* Aquí van tus rutas y páginas */}
      <Presupuesto />
      {/* ...otras rutas */}
    </AppSettingsProvider>
  );
}

export default App;
import React from "react";
import { useMoneda } from "../context/MonedaContext";

export default function BarraSuperior() {
  const { moneda, setMoneda } = useMoneda();

  return (
    <div>
      Moneda:
      <button onClick={() => setMoneda("ARS")} style={{ fontWeight: moneda === "ARS" ? "bold" : "normal" }}>ARS</button>
      <button onClick={() => setMoneda("USD")} style={{ fontWeight: moneda === "USD" ? "bold" : "normal" }}>USD</button>
      <button onClick={() => setMoneda("ILS")} style={{ fontWeight: moneda === "ILS" ? "bold" : "normal" }}>ILS</button>
    </div>
  );
}

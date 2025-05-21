import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSettings } from "../context/AppSettingsContext";
import clsx from "clsx";
import "./Presupuesto.css";

export default function Presupuesto() {
  const navigate = useNavigate();
  const {
    idioma,
    setIdioma,
    idiomasDisponibles,
    moneda,
    setMoneda,
    monedasDisponibles,
  } = useAppSettings();

  // Handlers separados para mayor claridad y reusabilidad
  const handleIdiomaChange = (code) => {
    setIdioma(code);
  };

  const handleMonedaChange = (code) => {
    setMoneda(code);
  };

  const handleNavigation = (e) => {
    e.preventDefault();
    navigate("/itinerario");
  };

  // Centralización de etiquetas para facilitar i18n
  const labels = {
    idioma: "Idioma:",
    moneda: "Moneda:",
    volver: "← Volver al itinerario",
  };

  return (
    <div className="topbar">
      <p className="idioma-label">{labels.idioma}</p>
      {idiomasDisponibles.map(({ code, label }) => (
        <button
          key={code}
          className={clsx("idioma-btn", { active: idioma === code })}
          onClick={() => handleIdiomaChange(code)}
        >
          {idioma === code ? <b>{label}</b> : label}
        </button>
      ))}
      <p className="moneda-label">{labels.moneda}</p>
      {monedasDisponibles.map((code) => (
        <button
          key={code}
          className={clsx("moneda-btn", { active: moneda === code })}
          onClick={() => handleMonedaChange(code)}
        >
          {moneda === code ? <b>{code}</b> : code}
        </button>
      ))}
      <button className="volver-link" onClick={handleNavigation}>
        {labels.volver}
      </button>
    </div>
  );
}
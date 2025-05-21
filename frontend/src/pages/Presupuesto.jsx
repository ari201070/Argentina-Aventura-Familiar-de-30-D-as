import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSettings } from "../context/AppSettingsContext";
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

  return (
    <div className="topbar">
      <span className="idioma-label">Idioma:</span>
      {idiomasDisponibles.map(({ code, label }) => (
        <button
          key={code}
          className={`idioma-btn${idioma === code ? " active" : ""}`}
          onClick={() => setIdioma(code)}
        >
          {idioma === code ? <b>{label}</b> : label}
        </button>
      ))}
      <span className="moneda-label">Moneda:</span>
      {monedasDisponibles.map((code) => (
        <button
          key={code}
          className={`moneda-btn${moneda === code ? " active" : ""}`}
          onClick={() => setMoneda(code)}
        >
          {moneda === code ? <b>{code}</b> : code}
        </button>
      ))}
      <a
        className="volver-link"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          navigate("/itinerario");
        }}
      >
        &larr; Volver al itinerario
      </a>
    </div>
  );
}
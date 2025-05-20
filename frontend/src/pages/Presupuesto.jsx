import React, { useEffect, useState } from "react";

const Presupuesto = () => {
  const [presupuesto, setPresupuesto] = useState(null);
  const [moneda, setMoneda] = useState("USD");

  useEffect(() => {
    fetch("/data/presupuesto.json")
      .then(res => res.json())
      .then(data => setPresupuesto(data));
  }, []);

  if (!presupuesto) return <div>Cargando...</div>;

  // Función para mostrar el símbolo de la moneda seleccionada
  const getSimbolo = (mon) => {
    switch(mon) {
      case "USD": return "$";
      case "ARS": return "$";
      case "ILS": return "₪";
      default: return "";
    }
  };

  // Conversión de totales según moneda seleccionada
  const getTotal = (base) => {
    if (moneda === "USD") return base;
    if (moneda === "ARS") return base * presupuesto.cambioARS;
    if (moneda === "ILS") return base * presupuesto.cambioILS;
    return base;
  };

  return (
    <div style={{padding:"2rem"}}>
      <h1>Presupuesto Familiar</h1>
      <div style={{marginBottom:"1rem"}}>
        <label>Ver en moneda: </label>
        <select value={moneda} onChange={e => setMoneda(e.target.value)}>
          <option value="USD">Dólar (USD)</option>
          <option value="ARS">Peso Argentino (ARS)</option>
          <option value="ILS">Shekel (ILS)</option>
        </select>
      </div>

      <div style={{background:"#f3f3f3", padding:"1rem", borderRadius:"8px", marginBottom:"2rem"}}>
        <h2>Resumen General</h2>
        <p><strong>Días:</strong> {presupuesto.resumen.totalDias}</p>
        <p><strong>Personas:</strong> {presupuesto.resumen.totalPersonas}</p>
        <p><strong>Total estimado:</strong> {getSimbolo(moneda)}{getTotal(presupuesto.resumen.totalPrevistoUSD).toLocaleString()}</p>
        <p><strong>Total con margen seguridad:</strong> {getSimbolo(moneda)}{getTotal(presupuesto.resumen.totalConMargenUSD).toLocaleString()}</p>
      </div>

      <h2>Costos promedio diarios</h2>
      <table border="1" cellPadding="6" style={{marginBottom:"2rem", borderCollapse:"collapse"}}>
        <thead>
          <tr>
            <th>Concepto</th>
            <th>Monto/por día ({getSimbolo(moneda)})</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(presupuesto.costosDiariosPromedio).map(([concepto, valor]) => (
            <tr key={concepto}>
              <td>{concepto.charAt(0).toUpperCase() + concepto.slice(1)}</td>
              <td>{getTotal(valor).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Detalle por Ciudad</h2>
      <table border="1" cellPadding="6" style={{borderCollapse:"collapse"}}>
        <thead>
          <tr>
            <th>Ciudad</th>
            <th>Días</th>
            <th>Alojamiento</th>
            <th>Comidas</th>
            <th>Actividades</th>
            <th>Transporte</th>
            <th>Otros</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {presupuesto.detallePorCiudad.map((ciudad, i) => (
            <tr key={i}>
              <td>{ciudad.ciudad}</td>
              <td>{ciudad.dias}</td>
              <td>{getTotal(ciudad.alojamiento).toLocaleString()}</td>
              <td>{getTotal(ciudad.comidas).toLocaleString()}</td>
              <td>{getTotal(ciudad.actividades).toLocaleString()}</td>
              <td>{getTotal(ciudad.transporteLocal).toLocaleString()}</td>
              <td>{getTotal(ciudad.otros).toLocaleString()}</td>
              <td><b>{getTotal(ciudad.totalUSD).toLocaleString()}</b></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Vuelos Internacionales</h2>
      <p><b>Origen:</b> {presupuesto.vuelosInternacionales.origen}</p>
      <p><b>Destino:</b> {presupuesto.vuelosInternacionales.destino}</p>
      <p><b>Compañía:</b> {presupuesto.vuelosInternacionales.compania}</p>
      <p><b>Escalas:</b> {presupuesto.vuelosInternacionales.escalas}</p>
      <p><b>Costo ida y vuelta:</b> {getSimbolo(moneda)}{getTotal(presupuesto.vuelosInternacionales.costoIdaVueltaUSD).toLocaleString()}</p>
      <p><i>{presupuesto.vuelosInternacionales.notas}</i></p>
    </div>
  );
};

export default Presupuesto;
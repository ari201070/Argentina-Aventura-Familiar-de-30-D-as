import React, { useState } from "react";

const AlertaVuelo = () => {
  const [form, setForm] = useState({
    from: "",
    to: "",
    departure: "",
  });

  return (
    <div>
      <h1>Crear alerta de precio de vuelo</h1>
      <input
        placeholder="Desde"
        value={form.from}
        onChange={e => setForm(f => ({ ...f, from: e.target.value }))}
      />
      <input
        placeholder="Hasta"
        value={form.to}
        onChange={e => setForm(f => ({ ...f, to: e.target.value }))}
      />
      <input
        type="date"
        value={form.departure}
        onChange={e => setForm(f => ({ ...f, departure: e.target.value }))}
      />
    </div>
  );
};

export default AlertaVuelo;
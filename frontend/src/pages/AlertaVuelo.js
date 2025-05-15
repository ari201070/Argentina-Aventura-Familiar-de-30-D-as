// frontend/src/pages/AlertaVuelo.jsx
import React, { useState } from 'react';

export default function AlertaVuelo() {
  const [form, setForm] = useState({
    from: "TLV",
    to: "EZE",
    departure: "2025-09-28",
    returnDate: "2025-11-02",
    price_threshold: 5000,
    notification_email: "tucorreo@ejemplo.com"
  });
  const [mensaje, setMensaje] = useState("");

  const crearAlerta = async () => {
    const res = await fetch('http://localhost:3001/mcp/flights/watch_price', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setMensaje(data.mensaje);
  };

  return (
    <div>
      <h1>Crear alerta de precio de vuelo</h1>
      <input placeholder="Desde" value={form.from} onChange={e => setForm(f => ({ ...f, from: e.target.value }))} />
      <input placeholder="Hasta" value={form.to} onChange={e => setForm(f => ({ ...f, to: e.target.value }))} />
      <input type="date" value={form.departure} onChange={e => setForm(f => ({ ...f, departure: e.target.value }))} />
      <input type="date" value={form.returnDate} onChange={e => setForm(f => ({ ...f, returnDate: e.target.value }))} />
      <input type="number" placeholder="Precio máximo" value={form.price_threshold} onChange={e => setForm(f => ({ ...f, price_threshold: e.target.value }))} />
      <input placeholder="Email" value={form.notification_email} onChange={e => setForm(f => ({ ...f, notification_email: e.target.value }))} />
      <button onClick={crearAlerta}>Crear alerta</button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

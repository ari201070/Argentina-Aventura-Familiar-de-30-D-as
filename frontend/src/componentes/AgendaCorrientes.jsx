import React, { useEffect, useState } from 'react';
import ICAL from 'ical.js';

function AgendaCorrientes() {
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Cambia la ruta si tu archivo .ics tiene otro nombre o está en otra carpeta
    const url = '/agenda-corrientes.ics';

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo cargar el archivo .ics');
        }
        return response.text();
      })
      .then(icsData => {
        try {
          const jcalData = ICAL.parse(icsData);
          const comp = new ICAL.Component(jcalData);
          const vevents = comp.getAllSubcomponents('vevent');
          const eventosParseados = vevents.map(ev => {
            const evento = new ICAL.Event(ev);
            return {
              resumen: evento.summary,
              descripcion: evento.description,
              inicio: evento.startDate.toJSDate(),
              fin: evento.endDate ? evento.endDate.toJSDate() : null,
              ubicacion: evento.location
            };
          });
          setEventos(eventosParseados);
        } catch (err) {
          setError('El archivo .ics no tiene el formato esperado.');
        }
      })
      .catch(err => {
        setError(err.message || 'Error al cargar el calendario');
      });
  }, []);

  return (
    <div>
      <h2>Agenda de Corrientes</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {eventos.length === 0 && !error && <li>No hay eventos cargados.</li>}
        {eventos.map((ev, idx) => (
          <li key={idx} style={{ marginBottom: '1em' }}>
            <strong>{ev.resumen}</strong><br />
            {ev.descripcion && <span>{ev.descripcion}<br /></span>}
            <span>
              {ev.inicio && `Inicio: ${ev.inicio.toLocaleString()}`}<br />
              {ev.fin && `Fin: ${ev.fin.toLocaleString()}`}<br />
            </span>
            {ev.ubicacion && <span>Ubicación: {ev.ubicacion}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AgendaCorrientes;
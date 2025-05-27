import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

const AgendaCorrientes = () => {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        // URL de ejemplo - reemplazar con la URL correcta de eventos de Corrientes
        const url = 'https://ciudaddecorrientes.gov.ar/agenda-cultural';
        
        const respuesta = await axios.get(url);
        const $ = cheerio.load(respuesta.data);
        
        const eventosEncontrados = [];

        // Ajustar los selectores según la estructura HTML de la página
        $('.evento').each((i, elemento) => {
          const titulo = $(elemento).find('.titulo-evento').text().trim();
          const fecha = $(elemento).find('.fecha-evento').text().trim();
          const lugar = $(elemento).find('.lugar-evento').text().trim();
          const descripcion = $(elemento).find('.descripcion-evento').text().trim();
          
          eventosEncontrados.push({
            id: i,
            titulo,
            fecha,
            lugar,
            descripcion
          });
        });

        setEventos(eventosEncontrados);
        setCargando(false);
      } catch (err) {
        console.error('Error al obtener eventos:', err);
        setError('No se pudieron cargar los eventos. Por favor, intente más tarde.');
        setCargando(false);
      }
    };

    obtenerEventos();
  }, []);

  if (cargando) {
    return (
      <div className="agenda-container">
        <h2>Agenda Cultural de Corrientes</h2>
        <p>Cargando eventos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="agenda-container">
        <h2>Agenda Cultural de Corrientes</h2>
        <p className="error-mensaje">{error}</p>
      </div>
    );
  }

  return (
    <div className="agenda-container">
      <h2>Agenda Cultural de Corrientes</h2>
      
      {eventos.length === 0 ? (
        <p>No hay eventos programados en este momento.</p>
      ) : (
        <div className="eventos-lista">
          {eventos.map((evento) => (
            <div key={evento.id} className="evento-card">
              <h3>{evento.titulo}</h3>
              <p className="fecha"><strong>Fecha:</strong> {evento.fecha}</p>
              <p className="lugar"><strong>Lugar:</strong> {evento.lugar}</p>
              <p className="descripcion">{evento.descripcion}</p>
            </div>
          ))}
        </div>
      )}
      
      <style jsx>{`
        .agenda-container {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        h2 {
          color: #2c3e50;
          text-align: center;
          margin-bottom: 30px;
        }
        
        .eventos-lista {
          display: grid;
          gap: 20px;
        }
        
        .evento-card {
          background: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .evento-card h3 {
          color: #2c3e50;
          margin: 0 0 10px 0;
        }
        
        .fecha, .lugar {
          color: #666;
          margin: 5px 0;
        }
        
        .descripcion {
          margin-top: 10px;
          line-height: 1.5;
        }
        
        .error-mensaje {
          color: #e74c3c;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default AgendaCorrientes;

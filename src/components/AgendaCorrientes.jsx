import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import '../styles/AgendaCorrientes.css';

const AgendaCorrientes = () => {
  const [eventos, setEventos] = useState([]);
  const [eventosFiltrados, setEventosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtroActual, setFiltroActual] = useState('todos');

  useEffect(() => {
    obtenerEventos();
  }, []);

  useEffect(() => {
    filtrarEventos(filtroActual);
  }, [eventos, filtroActual]);

  const obtenerEventos = async () => {
    try {
      const url = 'https://ciudaddecorrientes.gov.ar/agenda-cultural';
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      
      const respuesta = await axios.get(proxyUrl + url);
      const $ = cheerio.load(respuesta.data);
      
      const eventosEncontrados = [];

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
          descripcion,
          categoria: determinarCategoria(titulo, descripcion)
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

  const determinarCategoria = (titulo, descripcion) => {
    const texto = (titulo + ' ' + descripcion).toLowerCase();
    if (texto.includes('música') || texto.includes('concierto')) return 'musica';
    if (texto.includes('teatro') || texto.includes('obra')) return 'teatro';
    if (texto.includes('arte') || texto.includes('exposición')) return 'arte';
    return 'otros';
  };

  const filtrarEventos = (filtro) => {
    setFiltroActual(filtro);
    if (filtro === 'todos') {
      setEventosFiltrados(eventos);
    } else {
      setEventosFiltrados(eventos.filter(evento => evento.categoria === filtro));
    }
  };

  if (cargando) {
    return (
      <div className="agenda-container">
        <h2 className="agenda-titulo">Agenda Cultural de Corrientes</h2>
        <p className="cargando">Cargando eventos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="agenda-container">
        <h2 className="agenda-titulo">Agenda Cultural de Corrientes</h2>
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="agenda-container">
      <h2 className="agenda-titulo">Agenda Cultural de Corrientes</h2>
      
      <div className="filtros">
        <button 
          className={`filtro-btn ${filtroActual === 'todos' ? 'activo' : ''}`}
          onClick={() => filtrarEventos('todos')}
        >
          Todos
        </button>
        <button 
          className={`filtro-btn ${filtroActual === 'musica' ? 'activo' : ''}`}
          onClick={() => filtrarEventos('musica')}
        >
          Música
        </button>
        <button 
          className={`filtro-btn ${filtroActual === 'teatro' ? 'activo' : ''}`}
          onClick={() => filtrarEventos('teatro')}
        >
          Teatro
        </button>
        <button 
          className={`filtro-btn ${filtroActual === 'arte' ? 'activo' : ''}`}
          onClick={() => filtrarEventos('arte')}
        >
          Arte
        </button>
      </div>

      {eventosFiltrados.length === 0 ? (
        <p className="no-eventos">No hay eventos programados en esta categoría.</p>
      ) : (
        <div className="eventos-lista">
          {eventosFiltrados.map((evento) => (
            <div key={evento.id} className="evento-card">
              <h3 className="evento-titulo">{evento.titulo}</h3>
              <p className="evento-fecha"><strong>Fecha:</strong> {evento.fecha}</p>
              <p className="evento-lugar"><strong>Lugar:</strong> {evento.lugar}</p>
              <p className="evento-descripcion">{evento.descripcion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgendaCorrientes;

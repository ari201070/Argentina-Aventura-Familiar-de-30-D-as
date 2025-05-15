// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Itinerario from './pages/itinerario';
import AlertaVuelo from './pages/AlertaVuelo';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Itinerario</Link> | <Link to="/alerta-vuelo">Alerta de vuelo</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Itinerario />} />
        <Route path="/alerta-vuelo" element={<AlertaVuelo />} />
      </Routes>
    </Router>
  );
}

export default App;

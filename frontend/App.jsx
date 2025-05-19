// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Itinerario from './pages/itinerario';
import AlertaVuelo from './pages/AlertaVuelo';

function App() {
  return (
    <Router>
      <nav style={{ margin: 20 }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            marginRight: 12,
            fontWeight: isActive ? 'bold' : 'normal',
            textDecoration: isActive ? 'underline' : 'none',
          })}
          end
        >
          Itinerario
        </NavLink>
        <NavLink
          to="/alerta-vuelo"
          style={({ isActive }) => ({
            fontWeight: isActive ? 'bold' : 'normal',
            textDecoration: isActive ? 'underline' : 'none',
          })}
        >
          Alerta de vuelo
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Itinerario />} />
        <Route path="/alerta-vuelo" element={<AlertaVuelo />} />
      </Routes>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Itinerario from './pages/itinerario';
import AlertaVuelo from './pages/AlertaVuelo';
import { useMoneda } from './context/MonedaContext';

function CurrencySelector() {
  const { moneda, setMoneda, loading } = useMoneda();
  return (
    <select value={moneda} onChange={e => setMoneda(e.target.value)} disabled={loading} style={{ marginLeft: 12 }}>
      <option value="ARS">ARS</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
    </select>
  );
}

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
        <CurrencySelector />
      </nav>
      <Routes>
        <Route path="/" element={<Itinerario />} />
        <Route path="/alerta-vuelo" element={<AlertaVuelo />} />
      </Routes>
    </Router>
  );
}

export default App;
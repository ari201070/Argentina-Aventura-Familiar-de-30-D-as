import React, { useEffect, useState } from 'react';

function App() {
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then((response) => response.text())
      .then((data) => setMensaje(data))
      .catch((error) => setMensaje('Error al conectar con el backend'));
  }, []);

  return (
    <div>
      <h1>Frontend React</h1>
      <p>Mensaje del backend: {mensaje}</p>
    </div>
  );
}

export default App;

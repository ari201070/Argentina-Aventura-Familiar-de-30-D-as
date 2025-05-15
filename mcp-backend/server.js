// Importa las dependencias
const express = require('express');
const cors = require('cors');

const app = express();

// Habilita CORS para todas las rutas y orígenes
app.use(cors());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡Servidor Express funcionando!');
});

// Puedes agregar más rutas aquí
// app.get('/otra-ruta', (req, res) => {
//   res.send('Respuesta para otra ruta');
// });

// Puerto de escucha
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor MCP escuchando en el puerto ${PORT}`);
});

import express from 'express';
import libroRouter from './src/routes/libroRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para entender respuestas en formato JSON
app.use(express.json());

// Servir la carpeta public por si se necesita visualizar el HTML legacy desde el navegador
app.use(express.static('public'));

// Conectar las rutas de la API
app.use('/api', libroRouter);

// Control global para cualquier otra ruta inexistente (Error 404 alternativo)
app.use((req, res) => {
  res.status(404).json({
    exito: false,
    mensaje: "La ruta solicitada no existe en este servidor API."
  });
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(` Servidor corriendo en: http://localhost:${PORT}`);
  console.log(`=================================================`);
});
import express from 'express';
import libroRouter from './src/routes/libroRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use('/api', libroRouter);
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
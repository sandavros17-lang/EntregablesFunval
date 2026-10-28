import express from 'express';
import estudiantesRouter from './routes/estudiantes';

const app = express();
const PORT = 3000;

app.use(express.json());

// Montar el router modular bajo el prefijo /api/estudiantes
app.use('/api/estudiantes', estudiantesRouter);

// Activar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
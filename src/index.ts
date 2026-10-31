import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './swagger_output.json';

// 1. Importa tus rutas de estudiantes
import estudiantesRouter = require('./routes/estudiantes');

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use((req, res, next) => {
  console.log(`[PETICIÓN RECIBIDA] Método: ${req.method} | Ruta: ${req.url}`);
  next();
});

app.use(cors());

// Middleware para interpretar JSON en las peticiones POST y PUT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Agrega esto antes de tus rutas o justo debajo de app.use(express.json());
app.get('/', (req, res) => {
  res.json({ message: "API de Students Manager en línea" });
});

// Configuración de la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

// 2. MONTA LAS RUTAS AQUÍ (Con esto swagger-autogen las detectará)
app.use('/api/estudiantes', estudiantesRouter);
app.use('/estudiantes', estudiantesRouter);
app.use('/api/students', estudiantesRouter);
app.use('/students', estudiantesRouter);

// Endpoint GET de prueba
app.get('/api/status', (req, res) => {
  res.json({
    status: "Servidor en línea",
    version: "1.0.0"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


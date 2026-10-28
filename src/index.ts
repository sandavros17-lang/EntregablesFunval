import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

// 2. Interfaz y arreglo en memoria
interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];

// hacemos los end points del CRUD

// GET muestra a todos los estudiantes -------------------------
app.get('/api/estudiantes', (req: Request, res: Response) => {
  res.json(estudiantes);
});

// POST: Crear un nuevo estudiante y se asegura que tenga email ---------------
app.post('/api/estudiantes', (req: Request, res: Response) => {
  const { nombre, email, bootcamp } = req.body;

  // este if busca que ningun estudiante este sin email---------------------------
       if (!email) {
    res.status(400).json({ error: 'Por favor ingrese email, es obligatorio.' });
    return;
  }

  const nuevoEstudiante: Estudiante = {
    id: estudiantes.length + 1,
    nombre: nombre || 'Sin nombre',
    email,
    bootcamp: bootcamp || 'Desarrollo Web'
  };

  estudiantes.push(nuevoEstudiante);
  res.status(201).json({
    mensaje: 'Estudiante creado exitosamente',
    estudiante: nuevoEstudiante
  });
});

// PUT: Actualizar un estudiante por su id
app.put('/api/estudiantes/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const estudiante = estudiantes.find(e => e.id === id);

  if (!estudiante) {
    res.status(404).json({ error: 'El estudiante no se encuentra' });
    return;
  }

  const { nombre, email, bootcamp } = req.body;

  if (nombre) estudiante.nombre = nombre;
  if (email) estudiante.email = email;
  if (bootcamp) estudiante.bootcamp = bootcamp;

  res.json({
    mensaje: 'Estudiante actualizado exitosamente',
    estudiante
  });
});

// DELETE  Elimino  un estudiante por su id
app.delete('/api/estudiantes/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const index = estudiantes.findIndex(e => e.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'El estudiante no se encuentra' });
    return;
  }

  const eliminado = estudiantes.splice(index, 1);
  res.json({
    mensaje: 'Estudiante eliminado exitosamente',
    estudiante: eliminado[0]
  });
});

// esto sirve para activar el servidor--------------------
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
import { Router, Request, Response } from 'express';

// Definimos la interfaz aquí o la importas de tu carpeta interface
interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

// Simulamos el arreglo (puedes importarlo de tu archivo de datos si ya lo tienes separado)
const estudiantes: Estudiante[] = [];

const router = Router();

// GET: Muestra a todos los estudiantes o filtra por query string (?bootcamp=...)
router.get('/', (req: Request, res: Response) => {
  const { bootcamp } = req.query;

  if (bootcamp) {
    const filtrados = estudiantes.filter(
      (e) => e.bootcamp.toLowerCase() === String(bootcamp).toLowerCase()
    );
    return res.json(filtrados);
  }

  res.json(estudiantes);
});

// GET: Obtener un estudiante por su ID
router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const estudiante = estudiantes.find((e) => e.id === id);

  if (!estudiante) {
    return res.status(404).json({ error: 'El estudiante no se encuentra' });
  }

  res.json(estudiante);
});

// POST: Crear un nuevo estudiante
router.post('/', (req: Request, res: Response) => {
  const { nombre, email, bootcamp } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Por favor ingrese email, es obligatorio.' });
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
router.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const estudiante = estudiantes.find((e) => e.id === id);

  if (!estudiante) {
    return res.status(404).json({ error: 'El estudiante no se encuentra' });
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

// DELETE: Eliminar un estudiante por su id
router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const index = estudiantes.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'El estudiante no se encuentra' });
  }

  const eliminado = estudiantes.splice(index, 1);
  res.json({
    mensaje: 'Estudiante eliminado exitosamente',
    estudiante: eliminado[0]
  });
});

export default router;
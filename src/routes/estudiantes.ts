import { Router, Request, Response } from 'express';

interface Estudiante {
  id: number;
  nombre: string;
  name?: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];
const router = Router();

// GET: Muestra a todos los estudiantes o filtra por query string
router.get('/', (req: Request, res: Response) => {
  const { bootcamp } = req.query;

  let lista = estudiantes;
  if (bootcamp) {
    lista = estudiantes.filter(
      (e) => (e.bootcamp || '').toLowerCase() === String(bootcamp).toLowerCase()
    );
  }

  // Mapeamos para garantizar que el frontend de Netlify encuentre tanto 'nombre' como 'name'
  const listaMapeada = lista.map(e => {
    const valorNombre = e.nombre || e.name || 'Sin nombre';
    return {
      ...e,
      nombre: valorNombre,
      name: valorNombre
    };
  });

  return res.json(listaMapeada);
});

// GET: Obtener un estudiante por su ID
router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const estudiante = estudiantes.find((e) => e.id === id);

  if (!estudiante) {
    return res.status(404).json({ error: 'El estudiante no se encuentra' });
  }

  const valorNombre = estudiante.nombre || estudiante.name || 'Sin nombre';
  res.json({
    ...estudiante,
    nombre: valorNombre,
    name: valorNombre
  });
});

// POST: Crear un nuevo estudiante
router.post('/', (req: Request, res: Response) => {
  const { nombre, name, email, bootcamp } = req.body;
  const nombreFinal = name || nombre || 'Sin nombre';

  if (!email) {
    return res.status(400).json({ error: 'Por favor ingrese email, es obligatorio.' });
  }

  const nuevoEstudiante: Estudiante = {
    id: estudiantes.length + 1,
    nombre: nombreFinal,
    name: nombreFinal, // Guardamos ambos para compatibilidad total
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

  const { nombre, name, email, bootcamp } = req.body;
  const nuevoNombre = name || nombre;

  if (nuevoNombre) {
    estudiante.nombre = nuevoNombre;
    estudiante.name = nuevoNombre;
  }
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

export = router;
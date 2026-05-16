import { Router } from 'express';
import { getLibros, getLibrosDisponibles, getLibrosPorCategoria } from '../controllers/libroController.js';

const router = Router();

router.get('/libros', getLibros);
router.get('/libros/disponibles', getLibrosDisponibles);
router.get('/libros/categoria/:categoria', getLibrosPorCategoria);

export default router;
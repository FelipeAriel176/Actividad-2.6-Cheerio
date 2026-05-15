import { Router } from 'express';
import * as libroController from '../controllers/libroController.js';

const router = Router();

router.get('/', libroController.getLibros);
router.get('/disponibles', libroController.getDisponibles);
router.get('/categoria/:categoria', libroController.getPorCategoria);

export default router;

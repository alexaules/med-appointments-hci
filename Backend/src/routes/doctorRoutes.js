import { Router } from 'express';
import { body } from 'express-validator';
import {
  createDoctor,
  deleteDoctor,
  getDoctorById,
  getDoctors,
  updateDoctor
} from '../controllers/doctorController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = Router();

const doctorValidation = [
  body('fullName').notEmpty().withMessage('Nombre completo obligatorio'),
  body('specialty').notEmpty().withMessage('Especialidad obligatoria'),
  body('phone').notEmpty().withMessage('Teléfono obligatorio'),
  body('email').isEmail().withMessage('Correo inválido'),
  body('officeHours').notEmpty().withMessage('Horario obligatorio'),
  validateRequest
];

router.use(protect);
router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.post('/', authorize('admin', 'manager'), doctorValidation, createDoctor);
router.put('/:id', authorize('admin', 'manager'), doctorValidation, updateDoctor);
router.delete('/:id', authorize('admin'), deleteDoctor);

export default router;

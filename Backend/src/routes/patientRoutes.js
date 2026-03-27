import { Router } from 'express';
import { body } from 'express-validator';
import {
  createPatient,
  deletePatient,
  getPatientById,
  getPatients,
  updatePatient
} from '../controllers/patientController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = Router();

const patientValidation = [
  body('fullName').notEmpty().withMessage('Nombre completo obligatorio'),
  body('birthDate').notEmpty().withMessage('Fecha de nacimiento obligatoria'),
  body('address').notEmpty().withMessage('Dirección obligatoria'),
  body('phone').notEmpty().withMessage('Teléfono obligatorio'),
  body('sex').isIn(['Masculino', 'Femenino', 'Otro']).withMessage('Sexo inválido'),
  body('maritalStatus').notEmpty().withMessage('Estado civil obligatorio'),
  body('email').isEmail().withMessage('Correo inválido'),
  validateRequest
];

router.use(protect);
router.get('/', getPatients);
router.get('/:id', getPatientById);
router.post('/', authorize('admin', 'manager'), patientValidation, createPatient);
router.put('/:id', authorize('admin', 'manager'), patientValidation, updatePatient);
router.delete('/:id', authorize('admin'), deletePatient);

export default router;

import { Router } from 'express';
import { body } from 'express-validator';
import {
  createAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointments,
  updateAppointment
} from '../controllers/appointmentController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = Router();

const appointmentValidation = [
  body('patient').notEmpty().withMessage('Paciente obligatorio'),
  body('doctor').notEmpty().withMessage('Médico obligatorio'),
  body('specialty').notEmpty().withMessage('Especialidad obligatoria'),
  body('date').notEmpty().withMessage('Fecha obligatoria'),
  body('time').notEmpty().withMessage('Hora obligatoria'),
  body('reason').notEmpty().withMessage('Motivo obligatorio'),
  body('status')
    .optional()
    .isIn(['Pendiente', 'Confirmada', 'Cancelada', 'Atendida'])
    .withMessage('Estado inválido'),
  validateRequest
];

router.use(protect);
router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.post('/', authorize('admin', 'manager', 'doctor'), appointmentValidation, createAppointment);
router.put('/:id', authorize('admin', 'manager', 'doctor'), appointmentValidation, updateAppointment);
router.delete('/:id', authorize('admin', 'manager'), deleteAppointment);

export default router;

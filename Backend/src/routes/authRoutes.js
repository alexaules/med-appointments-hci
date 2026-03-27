import { Router } from 'express';
import { body } from 'express-validator';
import { login, register } from '../controllers/authController.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Correo inválido'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('role').optional().isIn(['admin', 'manager', 'doctor']).withMessage('Rol inválido'),
    validateRequest
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Correo inválido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    validateRequest
  ],
  login
);

export default router;

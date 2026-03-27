import { validationResult } from 'express-validator';

export function validateRequest(req, _res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = new Error('Validación fallida');
    error.statusCode = 400;
    error.errors = result.array();
    return next(error);
  }
  next();
}

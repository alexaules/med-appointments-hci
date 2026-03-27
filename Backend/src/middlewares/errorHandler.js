export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.originalUrl}`
  });
}

export function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    errors: err.errors || []
  });
}

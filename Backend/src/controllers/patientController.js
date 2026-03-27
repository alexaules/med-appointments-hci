import Patient from '../models/Patient.js';

export async function createPatient(req, res, next) {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
}

export async function getPatients(_req, res, next) {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json({ success: true, data: patients });
  } catch (error) {
    next(error);
  }
}

export async function getPatientById(req, res, next) {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      const error = new Error('Paciente no encontrado');
      error.statusCode = 404;
      throw error;
    }
    res.json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
}

export async function updatePatient(req, res, next) {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!patient) {
      const error = new Error('Paciente no encontrado');
      error.statusCode = 404;
      throw error;
    }
    res.json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
}

export async function deletePatient(req, res, next) {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      const error = new Error('Paciente no encontrado');
      error.statusCode = 404;
      throw error;
    }
    res.json({ success: true, message: 'Paciente eliminado correctamente' });
  } catch (error) {
    next(error);
  }
}

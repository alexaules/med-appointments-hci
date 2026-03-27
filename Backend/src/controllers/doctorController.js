import Doctor from '../models/Doctor.js';

export async function createDoctor(req, res, next) {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
}

export async function getDoctors(_req, res, next) {
  try {
    const doctors = await Doctor.find().sort({ specialty: 1, fullName: 1 });
    res.json({ success: true, data: doctors });
  } catch (error) {
    next(error);
  }
}

export async function getDoctorById(req, res, next) {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      const error = new Error('Médico no encontrado');
      error.statusCode = 404;
      throw error;
    }
    res.json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
}

export async function updateDoctor(req, res, next) {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!doctor) {
      const error = new Error('Médico no encontrado');
      error.statusCode = 404;
      throw error;
    }
    res.json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
}

export async function deleteDoctor(req, res, next) {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      const error = new Error('Médico no encontrado');
      error.statusCode = 404;
      throw error;
    }
    res.json({ success: true, message: 'Médico eliminado correctamente' });
  } catch (error) {
    next(error);
  }
}

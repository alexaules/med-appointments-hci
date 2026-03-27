import Appointment from '../models/Appointment.js';
import { buildAppointmentQuery } from '../utils/ApiQueryBuilder.js';

export async function createAppointment(req, res, next) {
  try {
    const appointment = await Appointment.create(req.body);
    const populated = await appointment.populate(['patient', 'doctor']);
    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    next(error);
  }
}

export async function getAppointments(req, res, next) {
  try {
    const filter = buildAppointmentQuery(req.query);
    const appointments = await Appointment.find(filter)
      .populate('patient')
      .populate('doctor')
      .sort({ date: 1, time: 1 });

    const stats = {
      total: appointments.length,
      pendientes: appointments.filter((item) => item.status === 'Pendiente').length,
      confirmadas: appointments.filter((item) => item.status === 'Confirmada').length,
      atendidas: appointments.filter((item) => item.status === 'Atendida').length
    };

    res.json({ success: true, data: appointments, meta: stats });
  } catch (error) {
    next(error);
  }
}

export async function getAppointmentById(req, res, next) {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('patient').populate('doctor');
    if (!appointment) {
      const error = new Error('Cita no encontrada');
      error.statusCode = 404;
      throw error;
    }
    res.json({ success: true, data: appointment });
  } catch (error) {
    next(error);
  }
}

export async function updateAppointment(req, res, next) {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .populate('patient')
      .populate('doctor');

    if (!appointment) {
      const error = new Error('Cita no encontrada');
      error.statusCode = 404;
      throw error;
    }

    res.json({ success: true, data: appointment });
  } catch (error) {
    next(error);
  }
}

export async function deleteAppointment(req, res, next) {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      const error = new Error('Cita no encontrada');
      error.statusCode = 404;
      throw error;
    }
    res.json({ success: true, message: 'Cita eliminada correctamente' });
  } catch (error) {
    next(error);
  }
}

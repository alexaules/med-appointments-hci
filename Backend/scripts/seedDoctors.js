import dotenv from 'dotenv';
import { connectDB } from '../src/config/db.js';
import Doctor from '../src/models/Doctor.js';

dotenv.config();

const doctors = [
  {
    fullName: 'Dra. María López',
    specialty: 'Cardiología',
    phone: '0999999991',
    email: 'maria.lopez@clinica.com',
    officeHours: 'Lunes a Viernes, 08:00 - 12:00'
  },
  {
    fullName: 'Dr. Carlos Paredes',
    specialty: 'Neurología',
    phone: '0999999992',
    email: 'carlos.paredes@clinica.com',
    officeHours: 'Lunes a Viernes, 13:00 - 17:00'
  },
  {
    fullName: 'Dra. Elena Torres',
    specialty: 'Pediatría',
    phone: '0999999993',
    email: 'elena.torres@clinica.com',
    officeHours: 'Martes a Sábado, 09:00 - 13:00'
  }
];

try {
  await connectDB();
  await Doctor.deleteMany({});
  await Doctor.insertMany(doctors);
  console.log('Médicos cargados correctamente');
  process.exit(0);
} catch (error) {
  console.error('Error al sembrar médicos:', error.message);
  process.exit(1);
}

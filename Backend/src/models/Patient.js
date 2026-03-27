import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    birthDate: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    sex: { type: String, enum: ['Masculino', 'Femenino', 'Otro'], required: true },
    disability: { type: Boolean, default: false },
    maritalStatus: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true }
  },
  { timestamps: true }
);

export default mongoose.model('Patient', patientSchema);

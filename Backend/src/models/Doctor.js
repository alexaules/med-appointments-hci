import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    specialty: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    officeHours: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Doctor', doctorSchema);

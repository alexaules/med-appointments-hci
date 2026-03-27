import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

const initialForm = {
  patient: '',
  doctor: '',
  specialty: '',
  date: '',
  time: '',
  reason: '',
  status: 'Pendiente',
  diagnosis: '',
  treatment: ''
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState('');
  const [feedback, setFeedback] = useState('');

  const loadData = async () => {
    const [appointmentsResult, patientsResult, doctorsResult] = await Promise.all([
      api.getAppointments(),
      api.getPatients(),
      api.getDoctors()
    ]);

    setAppointments(appointmentsResult.data);
    setPatients(patientsResult.data);
    setDoctors(doctorsResult.data);
  };

  useEffect(() => {
    loadData().catch((error) => setFeedback(error.message));
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === 'doctor') {
      const selectedDoctor = doctors.find((item) => item._id === value);
      setForm((prev) => ({
        ...prev,
        doctor: value,
        specialty: selectedDoctor?.specialty || prev.specialty
      }));
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const submit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) {
        await api.updateAppointment(editingId, form);
        setFeedback('Cita actualizada correctamente.');
      } else {
        await api.createAppointment(form);
        setFeedback('Cita registrada correctamente.');
      }
      setForm(initialForm);
      setEditingId('');
      await loadData();
    } catch (error) {
      setFeedback(error.message);
    }
  };

  const onEdit = (appointment) => {
    setEditingId(appointment._id);
    setForm({
      patient: appointment.patient?._id || '',
      doctor: appointment.doctor?._id || '',
      specialty: appointment.specialty,
      date: appointment.date,
      time: appointment.time,
      reason: appointment.reason,
      status: appointment.status,
      diagnosis: appointment.diagnosis || '',
      treatment: appointment.treatment || ''
    });
  };

  const onDelete = async (id) => {
    if (!window.confirm('¿Desea eliminar esta cita?')) return;
    try {
      await api.deleteAppointment(id);
      setFeedback('Cita eliminada.');
      await loadData();
    } catch (error) {
      setFeedback(error.message);
    }
  };

  return (
    <main className="container section split-layout">
      <section className="card">
        <h2>{editingId ? 'Editar cita' : 'Nueva cita'}</h2>
        <form className="grid-form" onSubmit={submit}>
          <select name="patient" value={form.patient} onChange={onChange}>
            <option value="">Seleccione paciente</option>
            {patients.map((item) => (
              <option key={item._id} value={item._id}>
                {item.fullName}
              </option>
            ))}
          </select>

          <select name="doctor" value={form.doctor} onChange={onChange}>
            <option value="">Seleccione médico</option>
            {doctors.map((item) => (
              <option key={item._id} value={item._id}>
                {item.fullName} - {item.specialty}
              </option>
            ))}
          </select>

          <input name="specialty" placeholder="Especialidad" value={form.specialty} onChange={onChange} />
          <input name="date" type="date" value={form.date} onChange={onChange} />
          <input name="time" type="time" value={form.time} onChange={onChange} />
          <input name="reason" placeholder="Motivo de la consulta" value={form.reason} onChange={onChange} />
          <select name="status" value={form.status} onChange={onChange}>
            <option>Pendiente</option>
            <option>Confirmada</option>
            <option>Cancelada</option>
            <option>Atendida</option>
          </select>
          <textarea name="diagnosis" placeholder="Diagnóstico" value={form.diagnosis} onChange={onChange} />
          <textarea name="treatment" placeholder="Tratamiento" value={form.treatment} onChange={onChange} />
          <button className="btn">{editingId ? 'Actualizar' : 'Guardar'}</button>
        </form>
        {feedback && <p className="feedback success">{feedback}</p>}
      </section>

      <section className="card">
        <h2>Listado de citas</h2>
        <div className="appointment-list">
          {appointments.map((item) => (
            <article key={item._id} className="appointment-card">
              <div>
                <h3>{item.patient?.fullName}</h3>
                <p>
                  {item.specialty} - {item.doctor?.fullName}
                </p>
                <p>
                  {item.date} | {item.time}
                </p>
                <p>Estado: {item.status}</p>
              </div>
              <div className="actions">
                <button className="btn-small" onClick={() => onEdit(item)}>
                  Editar
                </button>
                <button className="btn-small danger" onClick={() => onDelete(item._id)}>
                  Eliminar
                </button>
              </div>
            </article>
          ))}
          {!appointments.length && <p>No hay citas registradas.</p>}
        </div>
      </section>
    </main>
  );
}

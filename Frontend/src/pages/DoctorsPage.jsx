import { useEffect, useState } from 'react';
import CrudTable from '../components/CrudTable.jsx';
import { api } from '../services/api.js';

const initialForm = {
  fullName: '',
  specialty: '',
  phone: '',
  email: '',
  officeHours: ''
};

export default function DoctorsPage() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState('');
  const [feedback, setFeedback] = useState('');

  const loadData = async () => {
    const result = await api.getDoctors();
    setRows(result.data);
  };

  useEffect(() => {
    loadData().catch((error) => setFeedback(error.message));
  }, []);

  const onChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const submit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) {
        await api.updateDoctor(editingId, form);
        setFeedback('Médico actualizado correctamente.');
      } else {
        await api.createDoctor(form);
        setFeedback('Médico registrado correctamente.');
      }
      setForm(initialForm);
      setEditingId('');
      await loadData();
    } catch (error) {
      setFeedback(error.message);
    }
  };

  const onEdit = (row) => {
    setEditingId(row._id);
    setForm({ ...row });
  };

  const onDelete = async (id) => {
    if (!window.confirm('¿Desea eliminar este médico?')) return;
    try {
      await api.deleteDoctor(id);
      setFeedback('Médico eliminado.');
      await loadData();
    } catch (error) {
      setFeedback(error.message);
    }
  };

  return (
    <main className="container section split-layout">
      <section className="card">
        <h2>{editingId ? 'Editar médico' : 'Nuevo médico'}</h2>
        <form className="grid-form" onSubmit={submit}>
          <input name="fullName" placeholder="Nombre completo" value={form.fullName} onChange={onChange} />
          <input name="specialty" placeholder="Especialidad" value={form.specialty} onChange={onChange} />
          <input name="phone" placeholder="Teléfono" value={form.phone} onChange={onChange} />
          <input name="email" type="email" placeholder="Correo" value={form.email} onChange={onChange} />
          <input name="officeHours" placeholder="Horario de atención" value={form.officeHours} onChange={onChange} />
          <button className="btn">{editingId ? 'Actualizar' : 'Guardar'}</button>
        </form>
        {feedback && <p className="feedback success">{feedback}</p>}
      </section>

      <section className="card">
        <h2>Listado de médicos</h2>
        <CrudTable
          columns={[
            { key: 'fullName', label: 'Nombre' },
            { key: 'specialty', label: 'Especialidad' },
            { key: 'officeHours', label: 'Horario' }
          ]}
          rows={rows}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </section>
    </main>
  );
}

import { useEffect, useState } from 'react';
import CrudTable from '../components/CrudTable.jsx';
import { api } from '../services/api.js';

const initialForm = {
  fullName: '',
  birthDate: '',
  address: '',
  phone: '',
  sex: 'Masculino',
  disability: false,
  maritalStatus: 'Soltero/a',
  email: ''
};

export default function PatientsPage() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState('');
  const [feedback, setFeedback] = useState('');

  const loadData = async () => {
    const result = await api.getPatients();
    setRows(result.data);
  };

  useEffect(() => {
    loadData().catch((error) => setFeedback(error.message));
  }, []);

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const submit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) {
        await api.updatePatient(editingId, form);
        setFeedback('Paciente actualizado correctamente.');
      } else {
        await api.createPatient(form);
        setFeedback('Paciente registrado correctamente.');
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
    if (!window.confirm('¿Desea eliminar este paciente?')) return;
    try {
      await api.deletePatient(id);
      setFeedback('Paciente eliminado.');
      await loadData();
    } catch (error) {
      setFeedback(error.message);
    }
  };

  return (
    <main className="container section split-layout">
      <section className="card">
        <h2>{editingId ? 'Editar paciente' : 'Nuevo paciente'}</h2>
        <form className="grid-form" onSubmit={submit}>
          <input name="fullName" placeholder="Nombre completo" value={form.fullName} onChange={onChange} />
          <input name="birthDate" type="date" value={form.birthDate} onChange={onChange} />
          <input name="address" placeholder="Dirección" value={form.address} onChange={onChange} />
          <input name="phone" placeholder="Teléfono" value={form.phone} onChange={onChange} />
          <select name="sex" value={form.sex} onChange={onChange}>
            <option>Masculino</option>
            <option>Femenino</option>
            <option>Otro</option>
          </select>
          <input name="maritalStatus" placeholder="Estado civil" value={form.maritalStatus} onChange={onChange} />
          <input name="email" type="email" placeholder="Correo" value={form.email} onChange={onChange} />
          <label className="checkbox-line">
            <input name="disability" type="checkbox" checked={form.disability} onChange={onChange} />
            Posee discapacidad
          </label>
          <button className="btn">{editingId ? 'Actualizar' : 'Guardar'}</button>
        </form>
        {feedback && <p className="feedback success">{feedback}</p>}
      </section>

      <section className="card">
        <h2>Listado de pacientes</h2>
        <CrudTable
          columns={[
            { key: 'fullName', label: 'Nombre' },
            { key: 'phone', label: 'Teléfono' },
            { key: 'email', label: 'Correo' }
          ]}
          rows={rows}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </section>
    </main>
  );
}

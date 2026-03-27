import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { validateEmail, validatePassword } from '../utils/validators.js';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin'
  });
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const onChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(form.email)) {
      return setFeedback({ type: 'error', message: 'Ingrese un correo válido.' });
    }
    if (!validatePassword(form.password)) {
      return setFeedback({
        type: 'error',
        message: 'La contraseña debe tener 8 caracteres, una mayúscula y un número.'
      });
    }

    try {
      const result = await api.register(form);
      login(result.data);
      navigate('/dashboard');
    } catch (error) {
      setFeedback({ type: 'error', message: error.message });
    }
  };

  return (
    <main className="auth-layout">
      <form className="card form-card" onSubmit={onSubmit}>
        <h2>Registro de usuario</h2>
        <input name="name" placeholder="Nombre completo" value={form.name} onChange={onChange} />
        <input name="email" type="email" placeholder="Correo electrónico" value={form.email} onChange={onChange} />
        <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={onChange} />
        <select name="role" value={form.role} onChange={onChange}>
          <option value="admin">Administrador</option>
          <option value="manager">Gestor</option>
          <option value="doctor">Médico</option>
        </select>
        {feedback.message && <p className={`feedback ${feedback.type}`}>{feedback.message}</p>}
        <button className="btn">Registrarse</button>
      </form>
    </main>
  );
}

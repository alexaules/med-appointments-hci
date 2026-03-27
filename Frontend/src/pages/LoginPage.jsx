import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setFeedback({ type: '', message: '' });

    try {
      const result = await api.login(form);
      login(result.data);
      navigate('/dashboard');
    } catch (error) {
      setFeedback({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-layout">
      <form className="card form-card" onSubmit={onSubmit}>
        <h2>Ingreso al sistema</h2>
        <input name="email" type="email" placeholder="Correo electrónico" value={form.email} onChange={onChange} />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={onChange}
        />
        {feedback.message && <p className={`feedback ${feedback.type}`}>{feedback.message}</p>}
        <button className="btn" disabled={loading}>
          {loading ? 'Validando...' : 'Ingresar'}
        </button>
      </form>
    </main>
  );
}

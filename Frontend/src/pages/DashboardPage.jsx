import { useEffect, useState } from 'react';
import MetricCard from '../components/MetricCard.jsx';
import { api } from '../services/api.js';

export default function DashboardPage() {
  const [stats, setStats] = useState([
    { title: 'Pacientes', value: '0', subtitle: 'Registrados' },
    { title: 'Médicos', value: '0', subtitle: 'Especialistas' },
    { title: 'Citas', value: '0', subtitle: 'Totales' },
    { title: 'Confirmadas', value: '0', subtitle: 'Estado confirmado' }
  ]);

  useEffect(() => {
    Promise.all([api.getPatients(), api.getDoctors(), api.getAppointments()])
      .then(([patients, doctors, appointments]) => {
        setStats([
          { title: 'Pacientes', value: String(patients.data.length), subtitle: 'Registrados' },
          { title: 'Médicos', value: String(doctors.data.length), subtitle: 'Especialistas' },
          { title: 'Citas', value: String(appointments.data.length), subtitle: 'Totales' },
          { title: 'Confirmadas', value: String(appointments.meta.confirmadas || 0), subtitle: 'Estado confirmado' }
        ]);
      })
      .catch(() => {
        setStats((prev) => prev);
      });
  }, []);

  return (
    <main className="container section">
      <h1>Dashboard operativo</h1>
      <p>Resumen rápido del comportamiento del sistema y del flujo de citas.</p>
      <div className="metrics-grid">
        {stats.map((item) => (
          <MetricCard key={item.title} {...item} />
        ))}
      </div>
    </main>
  );
}

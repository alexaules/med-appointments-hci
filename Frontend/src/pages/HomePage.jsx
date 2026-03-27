import { Link } from 'react-router-dom';

export default function HomePage() {
  const features = [
    'Registro y actualización de pacientes',
    'Administración de médicos especialistas',
    'Programación, edición y cancelación de citas',
    'Historial y seguimiento clínico'
  ];

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Sistema académico de alta fidelidad</span>
            <h1>Gestión de Citas Médicas centrada en HCI</h1>
            <p>
              Prototipo diseñado con enfoque de usabilidad, accesibilidad, arquitectura limpia y
              experiencia de usuario para consultas externas y pruebas diagnósticas.
            </p>
            <div className="hero-actions">
              <Link className="btn" to="/registro">
                Crear cuenta
              </Link>
              <Link className="btn btn-outline" to="/ingresar">
                Iniciar sesión
              </Link>
            </div>
          </div>

          <div className="hero-card">
            <h3>Especialidades destacadas</h3>
            <ul>
              <li>Cardiología</li>
              <li>Neurología</li>
              <li>Pediatría</li>
              <li>Medicina interna</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container section">
        <h2>Características principales</h2>
        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature} className="feature-card">
              <h3>{feature}</h3>
              <p>Diseñado para reducir errores operativos y mejorar la atención del paciente.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

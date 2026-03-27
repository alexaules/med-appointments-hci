import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { isAuthenticated, logout, session } = useAuth();

  return (
    <header className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="brand">
          <span className="brand-badge">+</span>
          Clínica HCI
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Inicio</NavLink>
          {isAuthenticated && <NavLink to="/dashboard">Dashboard</NavLink>}
          {isAuthenticated && <NavLink to="/pacientes">Pacientes</NavLink>}
          {isAuthenticated && <NavLink to="/medicos">Médicos</NavLink>}
          {isAuthenticated && <NavLink to="/citas">Citas</NavLink>}
        </nav>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <span className="welcome">Hola, {session.user.name}</span>
              <button className="btn btn-outline" onClick={logout}>
                Salir
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline" to="/ingresar">
                Ingresar
              </Link>
              <Link className="btn" to="/registro">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

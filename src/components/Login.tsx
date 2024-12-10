import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    
    if (success) {
      navigate('/config');
    } else {
      setError('Credenciales inválidas. Use usuario: "usuario", password: "123456"');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-left">
          <div className="login-header">
            <svg className="water-icon" viewBox="0 0 24 24" fill="none" stroke="#4364f7" strokeWidth="2">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
            <h2>Bienvenido a HydroTracker</h2>
            <p>Tu compañero diario para mantener una hidratación saludable</p>
          </div>

          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </div>

        <div className="login-right">
          <div className="features-list">
            <div className="feature-item">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path d="M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
              </svg>
              <span>Establece tus metas diarias de hidratación</span>
            </div>
            <div className="feature-item">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20V10m0 0L8 14m4-4l4 4" />
                <path d="M20 4H4v16h16V4z" />
              </svg>
              <span>Registra tu consumo de agua fácilmente</span>
            </div>
            <div className="feature-item">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
              </svg>
              <span>Visualiza tu progreso diario</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
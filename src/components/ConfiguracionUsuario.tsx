import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ConfiguracionUsuario.css';

function ConfiguracionUsuario() {
  const navigate = useNavigate();
  const { username } = useAuth();
  const [meta, setMeta] = useState(() => localStorage.getItem('meta') || '');
  const [peso, setPeso] = useState(() => localStorage.getItem('peso') || '');
  const [estatura, setEstatura] = useState(() => localStorage.getItem('estatura') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('meta', meta);
    localStorage.setItem('peso', peso);
    localStorage.setItem('estatura', estatura);
    localStorage.setItem('consumo', '0');
    navigate('/panel');
  };

  return (
    <div className="config-container">
      <div className="config-card">
        <div className="config-header">
          <svg className="water-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
          <h2 className="welcome-text">¡Bienvenido, {username}!</h2>
          <p className="config-subtitle">Configura tus datos personales y meta diaria</p>
        </div>

        <form onSubmit={handleSubmit} className="config-form">
          <div className="form-group">
            <label htmlFor="meta">Meta diaria de agua (litros):</label>
            <input
              id="meta"
              type="number"
              value={meta}
              onChange={(e) => setMeta(e.target.value)}
              required
              min="0"
              step="0.1"
              placeholder="Ejemplo: 2.5"
            />
          </div>
          <div className="form-group">
            <label htmlFor="peso">Peso (kg):</label>
            <input
              id="peso"
              type="number"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              required
              min="0"
              step="0.1"
              placeholder="Ejemplo: 70"
            />
          </div>
          <div className="form-group">
            <label htmlFor="estatura">Estatura (cm):</label>
            <input
              id="estatura"
              type="number"
              value={estatura}
              onChange={(e) => setEstatura(e.target.value)}
              required
              min="0"
              placeholder="Ejemplo: 170"
            />
          </div>
          <button type="submit" className="config-button">Guardar y continuar</button>
        </form>
      </div>
    </div>
  );
}

export default ConfiguracionUsuario;
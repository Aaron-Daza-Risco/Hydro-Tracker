import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './PanelPrincipal.css';

function PanelPrincipal() {
  const navigate = useNavigate();
  const { username } = useAuth();
  const [meta, setMeta] = useState(0);
  const [consumo, setConsumo] = useState(0);

  useEffect(() => {
    const metaGuardada = localStorage.getItem('meta');
    const consumoGuardado = localStorage.getItem('consumo');

    if (metaGuardada) {
      setMeta(parseFloat(metaGuardada));
    } else {
      navigate('/config');
    }

    if (consumoGuardado) {
      setConsumo(parseFloat(consumoGuardado));
    }
  }, [navigate]);

  const agregarConsumo = (cantidad: number) => {
    const nuevoConsumo = consumo + cantidad;
    setConsumo(nuevoConsumo);
    localStorage.setItem('consumo', nuevoConsumo.toString());
  };

  const volverAConfiguracion = () => {
    navigate('/config');
  };

  const irAReporte = () => {
    navigate('/reporte');
  };

  const haAlcanzadoMeta = consumo >= meta;
  const progresoPercent = (consumo / meta) * 100;

  return (
    <div className="panel-container">
      <div className="panel-card">
        <div className="panel-header">
          <h1 className="panel-title">¡Hola de nuevo, {username}!</h1>
          <p className="meta-info">Tu meta diaria: {meta} litros</p>
        </div>

        <div className="consumo-actual">
          {consumo.toFixed(2)} L
        </div>

        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${Math.min(progresoPercent, 100)}%` }}
          />
        </div>

        <div className="botones-agua">
          <button 
            className="boton-agua"
            onClick={() => agregarConsumo(0.25)}
          >
            + 250ml
          </button>
          <button 
            className="boton-agua"
            onClick={() => agregarConsumo(0.5)}
          >
            + 500ml
          </button>
        </div>

        {haAlcanzadoMeta && (
          <>
            <p className="meta-alcanzada">
              ¡Felicitaciones! Has alcanzado tu meta diaria 🎉
            </p>
            <button
              className="boton-reporte"
              onClick={irAReporte}
            >
              Ver Reporte
            </button>
          </>
        )}

        <button 
          className="boton-config"
          onClick={volverAConfiguracion}
        >
          Cambiar Meta Diaria
        </button>
      </div>
    </div>
  );
}

export default PanelPrincipal;
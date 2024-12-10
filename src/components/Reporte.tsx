// Reporte.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Reporte.css';

function Reporte() {
  const navigate = useNavigate();
  const { username } = useAuth();
  const [consumo, setConsumo] = useState(0);
  const [meta, setMeta] = useState(0);
  const [peso, setPeso] = useState('');
  const [estatura, setEstatura] = useState('');
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    const metaGuardada = localStorage.getItem('meta');
    const consumoGuardado = localStorage.getItem('consumo');
    const pesoGuardado = localStorage.getItem('peso');
    const estaturaGuardada = localStorage.getItem('estatura');

    if (metaGuardada) setMeta(parseFloat(metaGuardada));
    if (consumoGuardado) setConsumo(parseFloat(consumoGuardado));
    if (pesoGuardado) setPeso(pesoGuardado);
    if (estaturaGuardada) setEstatura(estaturaGuardada);

    const hoy = new Date();
    const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' } as const;
    setFecha(hoy.toLocaleDateString('es-ES', opcionesFecha));
  }, []);

  const volverAPanel = () => {
    navigate('/panel');
  };

  return (
    <div className="reporte-container">
      <div className="reporte-card">
        <h2>Reporte Diario</h2>
        <p><strong>Fecha:</strong> {fecha}</p>
        <p><strong>Nombre:</strong> {username}</p>
        <p><strong>Peso:</strong> {peso} kg</p>
        <p><strong>Estatura:</strong> {estatura} cm</p>
        <p><strong>Consumo de Agua:</strong> {consumo.toFixed(2)} litros</p>
        <p><strong>Meta Diaria:</strong> {meta} litros</p>
        <p><strong>Estado:</strong> ¡Meta alcanzada!</p>
        
        <button 
          className="boton-volver"
          onClick={volverAPanel}
        >
          Volver al Panel
        </button>
      </div>
    </div>
  );
}

export default Reporte;
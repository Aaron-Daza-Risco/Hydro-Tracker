import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import ConfiguracionUsuario from './components/ConfiguracionUsuario';
import PanelPrincipal from './components/PanelPrincipal';
import Reporte from './components/Reporte';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route 
        path="/config" 
        element={
          <ProtectedRoute>
            <ConfiguracionUsuario />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/panel" 
        element={
          <ProtectedRoute>
            <PanelPrincipal />
          </ProtectedRoute>
        } 
      />
      <Route
        path="/reporte"
        element={
          <ProtectedRoute>
            <Reporte />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;

import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string;  // Añadimos username al contexto
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const login = (username: string, password: string) => {
    // Simulación de autenticación
    if (username === "usuario" && password === "123456") {
      setIsAuthenticated(true);
      setUsername(username);  // Guardamos el username
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
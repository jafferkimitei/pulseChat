/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface AuthContextProps {
  user: any;
  setUser: (user: any) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check session when app loads
    axios.get('http://localhost:5000/api/auth/me', { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const logout = () => {
    axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated: !!user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

'use client';
import React, { createContext, useState } from 'react';

interface User {
  id: string;
  user_id: string;
  cvu: string;
  alias: string;
  available_amount: string;
}

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (string: string | null) => void;
  logout: () => void;
  saveToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };
  const saveToken = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
};

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, logout, saveToken }}>
      {children}
    </AuthContext.Provider>
  );
};

/* export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; */
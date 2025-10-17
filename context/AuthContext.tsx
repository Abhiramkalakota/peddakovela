
import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { User } from '../types';
import { Role } from '../types';
import { MOCK_USERS } from '../constants';

interface AuthContextType {
  user: User | null;
  login: (username: string, password_unused: string, role: Role) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password_unused: string, role: Role): boolean => {
    // In a real app, you'd validate the password against a backend.
    // For this demo, we'll just check if the username exists for the selected role.
    const mockUser = MOCK_USERS[username];
    if (mockUser && mockUser.role === role) {
      setUser({ username, ...mockUser });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

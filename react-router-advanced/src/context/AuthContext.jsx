import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // Simulated auth — accept any non-empty credentials
    if (username.trim() && password.trim()) {
      const userData = {
        id: 1,
        username: username.trim(),
        name: username.trim().charAt(0).toUpperCase() + username.trim().slice(1),
        role: 'user',
        avatar: username.trim().charAt(0).toUpperCase(),
        joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
      };
      setUser(userData);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import React, { useState } from 'react';
import AuthContext from './AuthContext';
import { login as loginApi } from '../api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(localStorage.getItem('token'));

  const login = async (credentials) => {
    const { token } = await loginApi(credentials);
    localStorage.setItem('token', token);
    setTokenState(token);
    // In a real app, you'd decode the token to get user info
    setUser({ email: credentials.email });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setTokenState(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

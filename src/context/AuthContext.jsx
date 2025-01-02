import React, { createContext, useContext, useState } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const register = async (userData) => {
    try {
      const response = await authApi.register(userData);
      console.log('AuthContext Register Response:', response);
      
      if (response && response.role) {
        setUser({
          ...response,
          role: response.role || 'customer'
        });
        setIsLoggedIn(true);
        return { user: response };
      }
      throw new Error('Invalid response format from server');
    } catch (error) {
      console.error('AuthContext Register Error:', error);
      // Pass through the error message from api.js
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      console.log('Raw Login Response:', response);
      
      // The response is already the user object
      if (response && response.role) {
        setUser({
          ...response,
          role: response.role || 'customer'
        });
        setIsLoggedIn(true);
        return { user: response }; // Wrap it to match expected structure
      } else {
        console.error('Invalid Response Structure:', response);
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('AuthContext Login Error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      user, 
      register, 
      login, 
      logout,
      isAdmin: user?.role === 'admin'
    }}>
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
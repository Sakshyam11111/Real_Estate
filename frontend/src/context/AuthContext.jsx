// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = 'http://localhost:5000/api/auth';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Set axios authorization header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Fetch current user
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/me`);
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      // Token might be invalid
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Sign Up
  const signUp = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password
      });

      const { token: newToken, user: newUser } = response.data;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(newUser);
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed';
      return { success: false, error: message };
    }
  };

  // Sign In
  const signIn = async (email, password, rememberMe = false) => {
    try {
      const response = await axios.post(`${API_URL}/signin`, {
        email,
        password
      });

      const { token: newToken, user: newUser } = response.data;
      
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('email', email);
      }
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(newUser);
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Sign in failed';
      return { success: false, error: message };
    }
  };

  // Sign Out
  const signOut = async () => {
    try {
      await axios.post(`${API_URL}/signout`);
    } catch (error) {
      console.error('Signout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('rememberMe');
      setToken(null);
      setUser(null);
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
import { createContext, useContext, useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('de_token') || '');
  const [loading, setLoading] = useState(!!token);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const res = await apiClient.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.user);
      } catch (err) {
        console.error('Failed to load profile', err);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (payload) => {
    setToken(payload.token);
    localStorage.setItem('de_token', payload.token);
    setUser(payload.user || payload.admin);
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('de_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login: handleLogin,
        logout: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


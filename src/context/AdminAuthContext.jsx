import { createContext, useContext, useEffect, useState } from 'react';

const AdminAuthContext = createContext();
const BASE_URL = process.env.REACT_APP_API_URL;

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
  const [loading, setLoading] = useState(true);

  // Add this function to make authenticated requests as admin
  const authFetch = async (url, options = {}) => {
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers
      });

      if (response.status === 401) {
        // Token expired or invalid
        logout();
        throw new Error('Session expired. Please login again.');
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  };

  const login = async (adminData, authToken) => {
    localStorage.setItem('adminToken', authToken);
    localStorage.setItem('admin', JSON.stringify(adminData));
    setAdmin(adminData);
    setToken(authToken);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    setAdmin(null);
    setToken(null);
  };

  // Initialize admin auth state
  useEffect(() => {
    const initializeAdminAuth = async () => {
      const storedToken = localStorage.getItem('adminToken');
      const storedAdmin = localStorage.getItem('admin');

      if (storedToken && storedAdmin) {
        try {
          // Verify token is still valid
          const response = await fetch(`${BASE_URL}/api/auth/admin/profile`, {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });

          if (response.ok) {
            setAdmin(JSON.parse(storedAdmin));
            setToken(storedToken);
          } else {
            logout();
          }
        } catch (error) {
          console.error('Admin auth verification failed:', error);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAdminAuth();
  }, []);

  return (
    <AdminAuthContext.Provider 
      value={{ 
        admin, 
        token, 
        loading, 
        login, 
        logout,
        authFetch
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);

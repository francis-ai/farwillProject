import { useEffect } from 'react';
import axios from 'axios';

const Logout = () => {
  useEffect(() => {
    const logout = async () => {
      const baseUrl = process.env.REACT_APP_API_URL;
      const token = localStorage.getItem('adminToken');

      try {
        await axios.post(`${baseUrl}/admin/logout`, null, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
      } catch (error) {
        console.error('Logout error:', error.response?.data || error.message);
        // Still clear local storage even if request fails
      } finally {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
      }
    };

    logout();
  }, []); // ✅ Clean and no ESLint warning

  return null; // You can replace this with a spinner or message if desired
};

export default Logout;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Logout = () => {
  const { logout } = useAuth(); // this should clear the user from context
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // clear user and localStorage
    navigate('/signin'); // redirect to login
  }, [logout, navigate]);

  return null; // or a loading indicator
};

export default Logout;

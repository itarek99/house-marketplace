import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { AuthContext } from '../../context/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) return <Spinner />;
  if (!user) return <Navigate to='/sign-in' />;

  return children;
};
export default PrivateRoute;

import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) return <h1>Loading...</h1>;
  if (!user) return <Navigate to='/sign-in' />;

  return children;
};
export default PrivateRoute;

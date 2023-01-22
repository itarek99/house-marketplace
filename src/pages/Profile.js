import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const Profile = () => {
  const { user } = useContext(AuthContext);
  return <div>{user?.displayName}</div>;
};
export default Profile;

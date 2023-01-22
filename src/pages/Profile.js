import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>{user?.displayName}</h1>
    </div>
  );
};
export default Profile;

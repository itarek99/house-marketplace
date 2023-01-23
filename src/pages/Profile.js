import { doc, updateDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthProvider';
import { db } from '../firebase/firebase.config';

const Profile = () => {
  const [changeDetails, setChangeDetails] = useState(false);
  const { user, userSignOut, updateUserInfo } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const { email, name } = formData;
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await userSignOut();
      navigate('/sign-in');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFormData({ name: user.displayName, email: user.email });
  }, [user]);

  const handleChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      if (user.displayName !== name) {
        await updateUserInfo({ displayName: name });

        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error('Could Not Update Profile Details!');
    }
  };

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button onClick={handleLogOut} type='button' className='logOut'>
          Sign Out
        </button>
      </header>
      <main>
        <div className='profileDetailsHeader'>
          <p className='personalDetailsText'>Personal Details</p>
          <p
            onClick={() => {
              changeDetails && handleUpdate();
              setChangeDetails((prevState) => !prevState);
            }}
            className='changePersonalDetails'
          >
            {changeDetails ? 'Done' : 'Update'}
          </p>
        </div>

        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name || ''}
              onChange={handleChange}
            />
            <input
              type='email'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={true}
              value={email || ''}
              onChange={handleChange}
            />
          </form>
        </div>
      </main>
    </div>
  );
};
export default Profile;

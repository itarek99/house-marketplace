import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { AuthContext } from '../context/AuthProvider';
import { db } from '../firebase/firebase.config';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { name, email, password } = formData;
  const { updateUserInfo, signUpWithEmailAndPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signUpWithEmailAndPassword(email, password);
      const user = userCredential.user;

      updateUserInfo({ displayName: name });

      const fromDataCopy = { ...formData };
      delete fromDataCopy.password;
      fromDataCopy.timeStamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), fromDataCopy);

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>

        <form onSubmit={handleSignUp}>
          <input
            type='text'
            className='nameInput'
            placeholder='Full Name'
            id='name'
            value={name}
            onChange={handleChange}
          />
          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            id='email'
            value={email}
            onChange={handleChange}
          />
          <div className='passwordInputDiv'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='passwordInput'
              placeholder='password'
              id='password'
              value={password}
              onChange={handleChange}
            />
            <img
              onClick={() => setShowPassword((prevState) => !prevState)}
              src={visibilityIcon}
              alt='show password'
              className='showPassword'
            />
          </div>

          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password
          </Link>
          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='#fff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        {/* Google OAuth */}
        <Link to='/sign-in' className='registerLink'>
          Sign In Instead
        </Link>
      </div>
    </>
  );
};
export default Signup;

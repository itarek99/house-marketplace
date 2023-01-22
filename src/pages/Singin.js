import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { AuthContext } from '../context/AuthProvider';

const Singin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;
  const { singInWithEmailPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await singInWithEmailPassword(email, password);

      if (result.user) {
        toast('Sign In Successful!');
        navigate('/');
      }
    } catch (error) {
      toast.error('Something Wrong!');
    }
  };

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>

        <form onSubmit={handleSignIn}>
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
          <div className='signInBar'>
            <p className='signInText'>Sign In</p>
            <button className='signInButton'>
              <ArrowRightIcon fill='#fff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        {/* Google OAuth */}
        <Link to='/sign-up' className='registerLink'>
          Sign Up Instead
        </Link>
      </div>
    </>
  );
};
export default Singin;

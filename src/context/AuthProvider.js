import { getAuth } from 'firebase/auth';
import { createContext } from 'react';
import app from '../firebase/firebase.config';

const auth = getAuth(app);
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const authInfo = {};
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};
export default AuthProvider;

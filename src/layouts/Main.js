import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Main = () => {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
};
export default Main;

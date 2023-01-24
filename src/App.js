import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from './layouts/Main';
import Category from './pages/Category';
import CreateListing from './pages/CreateListing';
import Explore from './pages/Explore';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Singin from './pages/Singin';
import PrivateRoute from './routes/PrivateRoute/PrivateRoute';

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      children: [
        { path: '/', element: <Explore /> },
        { path: '/offers', element: <Offers /> },
        { path: '/category/:categoryName', element: <Category /> },
        {
          path: '/profile',
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },
        { path: '/sign-in', element: <Singin /> },
        { path: '/sign-up', element: <Signup /> },
        { path: '/forgot-password', element: <ForgotPassword /> },
        {
          path: '/create-listing',
          element: (
            <PrivateRoute>
              <CreateListing />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={routes} />
      <ToastContainer />
    </div>
  );
}

export default App;

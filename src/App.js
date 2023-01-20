import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './layouts/Main';
import Explore from './pages/Explore';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
import Signup from './pages/Signup';
import Singin from './pages/Singin';

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      children: [
        { path: '/', element: <Explore /> },
        { path: '/offers', element: <Offers /> },
        { path: '/profile', element: <Singin /> },
        { path: '/sign-in', element: <Singin /> },
        { path: '/sign-up', element: <Signup /> },
        { path: '/forgot-password', element: <ForgotPassword /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;

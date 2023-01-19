import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Explore from './pages/Explore';

function App() {
  const routes = createBrowserRouter([{ path: '/', element: <Explore /> }]);

  return <RouterProvider router={routes} />;
}

export default App;

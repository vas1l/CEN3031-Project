import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// Routes
import Root from './routes/Root';
import Dashboard from './routes/Dashboard';
import Signup from './routes/Signup';
import Login from './routes/Login';
import Forum from './routes/Forum';
import Albert from './routes/Albert';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/forum',
    element: <Forum />,
  },
  {
    path: '/albert',
    element: <Albert />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

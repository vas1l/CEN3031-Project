import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import './index.css';

// Routes
import Root from './routes/Root';
import Dashboard from './routes/Dashboard';
import Signup from './routes/Signup';
import Login from './routes/Login';
import Forum from './routes/Forum';
import Albert from './routes/Albert';
import CreatePost from './routes/CreatePost';
import ForumThreadRoute from './routes/ForumThreadRoute';
import { apiBaseUrl } from '../utils/url';

// loader function to protect routes from unauthorized users
const protectedLoader = async () => {
  try {
    // use the validateJWT middleware to handle token validation
    const response = await fetch(`${apiBaseUrl}/api/user/getbyjwt`, {
      credentials: 'include', // send cookies with request
    });

    if (!response.ok) {
      return redirect('/login');
    }

    return null;
  } catch (error) {
    console.error('Error:', error);
    return redirect('/login');
  }
};

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
    loader: protectedLoader,
  },
  {
    path: '/forum',
    element: <Forum />,
    loader: protectedLoader,
  },
  {
    path: '/forum/create-post',
    element: <CreatePost />,
    loader: protectedLoader,
  },
  {
    path: '/albert',
    element: <Albert />,
    loader: protectedLoader,
  },
  {
    path: '/forum/post/:id',
    element: <ForumThreadRoute />,
    loader: protectedLoader,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

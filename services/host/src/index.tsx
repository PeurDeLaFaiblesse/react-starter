import { createRoot } from 'react-dom/client';
import App from './App';
import './global/cssReset.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { About } from '@/pages/about';
import { Shop } from '@/pages/shop';
import { Suspense } from 'react';

const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'about',
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: 'shop',
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Shop />
          </Suspense>
        ),
      },
    ],
  },
]);

root.render(<RouterProvider router={router} />);

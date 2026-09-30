import { createBrowserRouter, RouterProvider } from 'react-router';
import { Layout } from '@/components/Layout';
import Home from '@/pages/Home';
import SignIn from '@/pages/SignIn';
import Analytics from '@/pages/Analytics';
import Modules from '@/pages/Modules';
import ModuleDetail from '@/pages/ModuleDetail';
import TourPage from '@/pages/Tour';
import Day from '@/pages/Day';
import Mobile from '@/pages/Mobile';
import Integrations from '@/pages/Integrations';
import Security from '@/pages/Security';
import Faq from '@/pages/Faq';
import NotFound from '@/pages/NotFound';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/sign-in', element: <SignIn /> },
      { path: '/analytics', element: <Analytics /> },
      { path: '/modules', element: <Modules /> },
      { path: '/modules/:slug', element: <ModuleDetail /> },
      { path: '/product-tour', element: <TourPage /> },
      { path: '/a-day', element: <Day /> },
      { path: '/mobile', element: <Mobile /> },
      { path: '/integrations', element: <Integrations /> },
      { path: '/security', element: <Security /> },
      { path: '/faq', element: <Faq /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

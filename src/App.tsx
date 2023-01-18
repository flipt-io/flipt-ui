import loadable from '@loadable/component';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { SWRConfig } from 'swr';
import Login, { loginLoader } from './app/auth/Login';
import ErrorLayout from './app/ErrorLayout';
import EditFlag from './app/flags/EditFlag';
import Evaluation from './app/flags/Evaluation';
import Flag, { flagLoader } from './app/flags/Flag';
import NewFlag from './app/flags/NewFlag';
import Layout from './app/Layout';
import NotFoundLayout from './app/NotFoundLayout';
import NewSegment from './app/segments/NewSegment';
import Segment, { segmentLoader } from './app/segments/Segment';

const Flags = loadable(() => import('./app/flags/Flags'));
const Segments = loadable(() => import('./app/segments/Segments'));
const Console = loadable(() => import('./app/console/Console'));

const router = createHashRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorLayout />,
    loader: loginLoader
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorLayout />,
    children: [
      {
        element: <Flags />,
        index: true
      },
      {
        path: 'flags',
        element: <Flags />
      },
      {
        path: 'flags/new',
        element: <NewFlag />
      },
      {
        path: 'flags/:flagKey',
        element: <Flag />,
        loader: flagLoader,
        children: [
          {
            path: '',
            element: <EditFlag />
          },
          {
            path: 'evaluation',
            element: <Evaluation />
          }
        ]
      },
      {
        path: 'segments',
        element: <Segments />
      },
      {
        path: 'segments/new',
        element: <NewSegment />
      },
      {
        path: 'segments/:segmentKey',
        element: <Segment />,
        loader: segmentLoader
      },
      {
        path: 'console',
        element: <Console />
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundLayout />
  }
]);

const apiURL = '/api/v1';

const fetcher = async (uri: String) => {
  const res = await fetch(apiURL + uri, { credentials: 'include' });

  class StatusError extends Error {
    info: string;

    status: number;

    constructor(message: string, info: string, status: number) {
      super(message);
      this.info = info;
      this.status = status;
    }
  }

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    let info = '';
    info = await res.json();

    return new StatusError(
      'An error occurred while fetching the data.',
      info,
      res.status
    );
  }

  return res.json();
};

export default function App() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 10000, // 10 seconds
        fetcher
      }}
    >
      <RouterProvider router={router} />
    </SWRConfig>
  );
}

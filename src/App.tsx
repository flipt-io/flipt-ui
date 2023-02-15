import loadable from '@loadable/component';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { SWRConfig } from 'swr';
import ErrorLayout from './app/ErrorLayout';
import EditFlag from './app/flags/EditFlag';
import Evaluation from './app/flags/Evaluation';
import Flag, { flagLoader } from './app/flags/Flag';
import NewFlag from './app/flags/NewFlag';
import Layout from './app/Layout';
import NotFoundLayout from './app/NotFoundLayout';
import NewSegment from './app/segments/NewSegment';
import Segment, { segmentLoader } from './app/segments/Segment';
import SessionProvider from './components/SessionProvider';

const Flags = loadable(() => import('./app/flags/Flags'));
const Segments = loadable(() => import('./app/segments/Segments'));
const Console = loadable(() => import('./app/console/Console'));
const Login = loadable(() => import('./app/auth/Login'));
const Settings = loadable(() => import('./app/settings/Settings'));
const Tokens = loadable(() => import('./app/settings/tokens/Tokens'));

const router = createHashRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorLayout />
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
      },
      {
        path: 'settings',
        element: <Settings />,
        children: [
          {
            element: <Tokens />,
            index: true
          },
          {
            path: 'tokens',
            element: <Tokens />
          }
        ]
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
  const res = await fetch(apiURL + uri);

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
    if (res.status === 401) {
      window.localStorage.clear();
      window.location.reload();
    }

    const contentType = res.headers.get('content-type');

    if (!contentType || !contentType.includes('application/json')) {
      const err = new StatusError(
        'An unexpected error occurred.',
        await res.text(),
        res.status
      );
      console.log(err);
      throw err;
    }

    let info = '';
    info = await res.json();

    const err = new StatusError(
      'An error occurred while fetching the data.',
      info,
      res.status
    );
    console.log(err);
    throw err;
  }

  return res.json();
};

export default function App() {
  return (
    <SWRConfig
      value={{
        fetcher
      }}
    >
      <SessionProvider>
        <RouterProvider router={router} />
      </SessionProvider>
    </SWRConfig>
  );
}

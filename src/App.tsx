import { createHashRouter, RouterProvider } from 'react-router-dom';
import { SWRConfig } from 'swr';
import Console from './app/console/Console';
import ErrorLayout from './app/ErrorLayout';
import EditFlag from './app/flags/EditFlag';
import Evaluation from './app/flags/Evaluation';
import Flag, { flagLoader } from './app/flags/Flag';
import Flags from './app/flags/Flags';
import NewFlag from './app/flags/NewFlag';
import Layout from './app/Layout';
import NotFoundLayout from './app/NotFoundLayout';
import NewSegment from './app/segments/NewSegment';
import Segment, { segmentLoader } from './app/segments/Segment';
import Segments from './app/segments/Segments';

const router = createHashRouter([
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

const fetcher = (uri: string) => fetch(apiURL + uri).then((res) => res.json());

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

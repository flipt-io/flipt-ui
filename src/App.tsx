import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SWRConfig } from "swr";
import Flag, { flagLoader } from "~/app/flags/Flag";
import Console from "./app/console/Console";
import EditFlag from "./app/flags/EditFlag";
import Evaluation from "./app/flags/Evaluation";
import Flags from "./app/flags/Flags";
import NewFlag from "./app/flags/NewFlag";
import NewSegment from "./app/segments/NewSegment";
import Segment, { segmentLoader } from "./app/segments/Segment";
import Segments from "./app/segments/Segments";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <Flags />,
        index: true,
      },
      {
        path: "flags/new",
        element: <NewFlag />,
      },
      {
        path: "flags/:flagKey",
        element: <Flag />,
        loader: flagLoader,
        children: [
          {
            path: "",
            element: <EditFlag />,
          },
          {
            path: "evaluation",
            element: <Evaluation />,
          },
        ],
      },
      {
        path: "segments",
        element: <Segments />,
      },
      {
        path: "segments/new",
        element: <NewSegment />,
      },
      {
        path: "segments/:segmentKey",
        element: <Segment />,
        loader: segmentLoader,
      },
      {
        path: "console",
        element: <Console />,
      },
    ],
  },
]);

const apiURL = (import.meta.env.FLIPT_BASE_URL ?? "") + "/api/v1";

const fetcher = async (uri: String) => {
  const res = await fetch(apiURL + uri, { credentials: 'include' })

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
    try {
      info = await res.json()
    } catch {}

    return new StatusError('An error occurred while fetching the data.', info, res.status)
  }

  return res.json()
}

export default function App() {
  return (
    <>
      <SWRConfig
        value={{
          refreshInterval: 10000, // 10 seconds
          fetcher: fetcher,
        }}
      >
        <RouterProvider router={router} />
      </SWRConfig>
    </>
  );
}

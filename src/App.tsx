import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SWRConfig } from "swr";
import Flag, { flagLoader } from "~/app/flags/Flag";
import Flags from "./app/flags/Flags";
import NewFlag from "./app/flags/NewFlag";
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
      },
      {
        path: "segments",
        element: <Segments />,
      },
      {
        path: "segments/:segmentKey",
        element: <Segment />,
        loader: segmentLoader,
      },
    ],
  },
]);

const apiURL = (import.meta.env.FLIPT_BASE_URL ?? "") + "/api/v1";

const fetcher = (uri: string) => fetch(apiURL + uri).then((res) => res.json());

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

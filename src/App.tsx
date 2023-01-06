import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SWRConfig } from "swr";
import Flag, { flagLoader } from "~/app/flags/Flag";
import Flags from "~/app/flags/Flags";
import Layout from "~/components/Layout";
import NewFlag from "./app/flags/NewFlag";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Flags />,
  },
  {
    path: "/flags/new",
    element: <NewFlag />,
  },
  {
    path: "/flags/:flagKey",
    element: <Flag />,
    loader: flagLoader,
  },
]);

const apiURL = (import.meta.env.FLIPT_BASE_URL ?? "") + "/api/v1";

const fetcher = (uri: string) => fetch(apiURL + uri).then((res) => res.json());

export default function App() {
  return (
    <>
      <Layout>
        <SWRConfig
          value={{
            refreshInterval: 10000, // 10 seconds
            fetcher: fetcher,
          }}
        >
          <RouterProvider router={router} />
        </SWRConfig>
      </Layout>
    </>
  );
}

import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { Suspense } from "react";
import { About } from "@/pages/about";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <About />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;

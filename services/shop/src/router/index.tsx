import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { Suspense } from "react";
import { Shop } from "@/pages/shop";

const routes = [
  {
    path: "/shop",
    element: <App />,
    children: [
      {
        path: "/shop/",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: "/shop/help",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <div>HELP</div>
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;

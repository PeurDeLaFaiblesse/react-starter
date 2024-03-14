import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
// @ts-ignore
import adminRoutes from "admin/routes";
// @ts-ignore
import shopRoutes from "shop/routes";

console.log("adssad", adminRoutes, shopRoutes);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [...adminRoutes, ...shopRoutes],
  },
]);

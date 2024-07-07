import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import Products from "../pages/AllProducts";
import ProtectedRoutes from "../components/ProtectedRoutes";
import CategoryProduct from "../pages/CategoryProduct";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "sign-up",
          element: <Signup />,
        },
        {
          path: "product-category/:categoryName",
          element: <CategoryProduct />,
        },
        {
          path: "admin-panel/",
          element: <AdminPanel/>,
          children: [
            {
              path: "all-users",
              element: <AllUsers />,
            },
            {
              path: "all-products",
              element: <Products />,
            }
          ]
        },
      ],
    },
  ]);
  export default router;
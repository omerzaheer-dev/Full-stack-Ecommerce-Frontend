import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";
import AdminPanel from "../pages/AdminPanel";
import AllOrders from "../pages/AllOrders"
import AllUsers from "../pages/AllUsers";
import Products from "../pages/AllProducts";
import ProtectedRoutes from "../components/ProtectedRoutes";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Search from "../pages/Search";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import Orders from "../pages/Orders";

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
          path: "cart",
          element: <Cart />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "success",
          element: <Success />,
        },
        {
          path: "cancel",
          element: <Cancel />,
        },
        {
          path: "search",
          element: <Search />,
        },
        {
          path: "product-category/:categoryName",
          element: <CategoryProduct />,
        },
        {
          path: "product-category",
          element: <CategoryProduct />,
        },
        {
          path: "product/:id",
          element: <ProductDetails />,
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
            },
            {
              path: "all-orders",
              element: <AllOrders/>,
            }
          ]
        },
      ],
    },
  ]);
  export default router;
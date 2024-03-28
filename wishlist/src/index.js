import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import SharedWishlist from "./pages/SharedWishlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <Products />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/wishlist/shared",
        element: <SharedWishlist />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
);

reportWebVitals();

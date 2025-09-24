import React from "react";
import ItemList from "./components/ItemList/ItemList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Login from "./components/LoginModal/Login.jsx";
import Register from "./components/LoginModal/Register.jsx";

const routes = [
  { path: "/", element: <ItemList /> },
  { path: "/products/:id", element: <ProductDetail /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

export default routes;

import React from "react";
import ItemList from "./components/ItemList/ItemList";
import ProductDetail from "./components/ProductDetail/ProductDetail";

const routes = [
  { path: "/", element: <ItemList /> },
  { path: "/products/:id", element: <ProductDetail /> },
];

export default routes;

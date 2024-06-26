import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Authentication from "./pages/Authentication";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Favorites from "./pages/Favorites";
import Daily from "./pages/Daily";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="authentication" element={<Authentication />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="daily" element={<Daily />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);

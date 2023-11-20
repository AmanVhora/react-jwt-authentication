import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";

const Routes = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<div>About us</div>} />
      {token !== null ? (
        <Route path="/profile" element={<div>Profile</div>} />
      ) : (
        <Route path="/login" element={<Login />} />
      )}
      <Route path="*" element={<h2>404 Page not found</h2>} />
    </RouterRoutes>
  );
};

export default Routes;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RandomMTR from "./pages/utils/RandomMTR";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Home from "./pages/Home";

const Main = () => {
  return (
    <Routes>
      {" "}
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route path="/" element={<Home />}></Route>
      <Route path="/random/mtr" element={<RandomMTR />}></Route>
      <Route
        path="/utils/random-mtr"
        element={<Navigate to="/random/mtr" replace />}
      ></Route>
      <Route path="*" element={<Navigate to="/" replace />}></Route>
    </Routes>
  );
};

export default Main;

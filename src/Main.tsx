import React from "react";
import { Routes, Route } from "react-router-dom";

import RandomMTR from "./pages/utils/RandomMTR";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const Main = () => {
  return (
    <Routes>
      {" "}
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route path="/utils/random-mtr" element={<RandomMTR />}></Route>
    </Routes>
  );
};

export default Main;

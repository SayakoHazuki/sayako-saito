import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import RandomMTR from "./pages/random/RandomMTR";
import Home from "./pages/Home";
import RandomNumber from "./pages/random/RandomNumber";
import QrCodeGen from "./pages/tools/QrCode";
import RandomBus from "./pages/random/RandomBus/Main";

const Main = () => {
  return (
    <Routes>
      {" "}
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route path="/" element={<Home />} />
      <Route path="/random/mtr" element={<RandomMTR />} />
      <Route path="/random/number" element={<RandomNumber />} />
      <Route path="/random/bus" element={<RandomBus />} />
      <Route path="/utils/qrcode" element={<QrCodeGen />} />
      <Route
        path="/utils/random-mtr"
        element={<Navigate to="/random/mtr" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Main;

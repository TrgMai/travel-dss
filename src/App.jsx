import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import RecommendPhase1 from "./pages/RecommendPhase1";
import RecommendPhase2 from "./pages/RecommendPhase2";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/place/:id" element={<Detail />} />
        <Route path="/recommend/phase1" element={<RecommendPhase1 />} />
        <Route path="/recommend/phase2" element={<RecommendPhase2 />} />
      </Routes>
    </BrowserRouter>
  );
}

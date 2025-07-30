import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import RecommendPhase1 from "./pages/RecommendPhase1";
import RecommendPhase2 from "./pages/RecommendPhase2";
import RecommendPhase3 from "./pages/RecommendPhase3";
import RecommendResult from "./pages/RecommendResult";
import TourList from "./pages/TourList";
import TourDetail from "./pages/TourDetail";
import HotelList from "./pages/HotelList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/place/:id" element={<Detail />} />
        <Route path="/recommend/phase1" element={<RecommendPhase1 />} />
        <Route path="/recommend/phase2" element={<RecommendPhase2 />} />
        <Route path="/recommend/phase3" element={<RecommendPhase3 />} />
        <Route path="/recommend/result" element={<RecommendResult />} />
        <Route path="/tours" element={<TourList />} />
        <Route path="/tour/:id" element={<TourDetail />} />
        <Route path="/hotels" element={<HotelList />} />
      </Routes>
    </BrowserRouter>
  );
}

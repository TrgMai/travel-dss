import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RecommendPhase1 from "./pages/RecommendPhase1";
import RecommendPhase2 from "./pages/RecommendPhase2";
import RecommendPhase3 from "./pages/RecommendPhase3";
import RecommendResult from "./pages/RecommendResult";
import AllDestinations from "./pages/AllDestinations";
import TourList from "./pages/TourList";
import TourDetail from "./pages/TourDetail";
import HotelDetail from "./pages/HotelDetail";
import HotelList from "./pages/HotelList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import ApiCheckPopup from "./components/ApiCheckPopup";

export default function App() {
  const [isApiReady, setIsApiReady] = useState(false);

  return (
    <>
      <ApiCheckPopup onSuccess={() => setIsApiReady(true)} />
      {isApiReady && (
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/place/:id" element={<Detail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/all-destinations" element={<AllDestinations />} />
              <Route path="/recommend/phase1" element={<RecommendPhase1 />} />
              <Route path="/recommend/phase2" element={<RecommendPhase2 />} />
              <Route path="/recommend/phase3" element={<RecommendPhase3 />} />
              <Route path="/recommend/result" element={<RecommendResult />} />
              <Route path="/recommend/tour-list" element={<TourList />} />
              <Route path="/hotel-detail" element={<HotelDetail />} />
              <Route path="/tour/:id" element={<TourDetail />} />
              <Route path="/hotels" element={<HotelList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      )}
    </>
  );
}

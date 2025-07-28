import React, { useState } from "react";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Places from "../components/Places";
import Footer from "../components/Footer";
import StartRecommendation from "../components/StartRecommendation";
import Promotions from "../components/Promotions";

export default function Home() {
  const [searchData] = useState(null);

  return (
    <div className="font-sans">
      <TopBar />
      <Header />
      <Hero /> 
      <div className="max-w-7xl mx-auto">
        <Promotions />
      </div>
      <StartRecommendation />
      <Places searchData={searchData} />
      <Footer />
    </div>
  );
}

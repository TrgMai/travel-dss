import React, { useState } from "react";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Places from "../components/Places";
import Footer from "../components/Footer";
import StartRecommendation from "../components/StartRecommendation";

export default function Home() {
  const [searchData, setSearchData] = useState(null);

  const handleSearch = (data) => {
    setSearchData(data);
  };

  return (
    <div className="font-sans">
      <TopBar />
      <Header />
      <Hero />
      <SearchBar onSearch={handleSearch} />
      <StartRecommendation />
      <Places searchData={searchData} />
      <Footer />
    </div>
  );
}

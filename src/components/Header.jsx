import React, { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white shadow-lg" : "bg-transparent"
    }`}>
      <div className={`py-2 px-8 flex justify-between items-center max-w-6xl mx-auto ${
        isScrolled ? "" : "border-b border-white/10"
      }`}>
        <div className={`text-2xl font-bold flex items-center bg-transparent ${
          isScrolled ? "text-blue-600" : "text-white"
        }`}>
          <img src="/logo.png" alt="AmazingTour Logo" className="inline-block h-14 mr-2 rounded-full" />
          AmazingTour
        </div>
        <nav className="space-x-6 font-medium">
          <a href="#" className={`hover:text-blue-400 transition-colors ${
            isScrolled ? "text-gray-700" : "text-white"
          }`}>Khám phá</a>
          <a href="#" className={`hover:text-blue-400 transition-colors ${
            isScrolled ? "text-gray-700" : "text-white"
          }`}>Địa điểm HOT</a>
          <a href="#" className={`hover:text-blue-400 transition-colors ${
            isScrolled ? "text-gray-700" : "text-white"
          }`}>Đánh giá</a>
          <a href="#" className={`hover:text-blue-400 transition-colors ${
            isScrolled ? "text-gray-700" : "text-white"
          }`}>Hỗ trợ</a>
        </nav>
        <button className={`px-4 py-2 rounded transition-colors ${
          isScrolled 
            ? "bg-blue-600 text-white hover:bg-blue-700" 
            : "bg-white text-blue-600 hover:bg-blue-50"
        }`}>
          Đặt ngay
        </button>
      </div>
    </header>
  );
}

import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaCalendar, FaUsers } from "react-icons/fa";

export default function Hero() {
  const [searchParams, setSearchParams] = useState({
    destination: "",
    dates: "",
    travelers: "2 người"
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
  };

  return (
    <div className="relative">
      {/* Hero Background */}
      <div 
        className="h-[600px] bg-cover bg-no-repeat bg-center relative w-full"
        style={{
          backgroundImage: "url('/background.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Search Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Khám Phá Điểm Đến Tiếp Theo
          </h1>
          <p className="text-xl md:text-2xl">
            Tìm và đặt tour du lịch phù hợp với bạn
          </p>
        </div>

        {/* Search Form */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Destination Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Bạn muốn đi đâu?"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchParams.destination}
                  onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
                />
              </div>

              {/* Date Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <FaCalendar className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Chọn ngày"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchParams.dates}
                  onChange={(e) => setSearchParams({...searchParams, dates: e.target.value})}
                />
              </div>

              {/* Travelers Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <FaUsers className="text-gray-400" />
                </div>
                <select
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  value={searchParams.travelers}
                  onChange={(e) => setSearchParams({...searchParams, travelers: e.target.value})}
                >
                  <option>1 người</option>
                  <option>2 người</option>
                  <option>3 người</option>
                  <option>4+ người</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <FaSearch />
              <span>Tìm Kiếm</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

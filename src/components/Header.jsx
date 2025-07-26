import React from "react";

export default function Header() {
  return (
    <header className="bg-white shadow py-4 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600">🌊 OceanTour</div>
      <nav className="space-x-6 text-gray-700 font-medium">
        <a href="#">Home</a>
        <a href="#">Blogs</a>
        <a href="#">Best Places</a>
        <a href="#">About</a>
        <a href="#">Quick Links</a>
      </nav>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Book Now
      </button>
    </header>
  );
}

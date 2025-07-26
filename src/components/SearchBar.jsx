import React, { useState } from "react";

function SearchBar() {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState(30);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search:", { destination, date, price });
    // Sau này có thể gọi API hoặc điều hướng...
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-4 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-md shadow-md grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search your Destination
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Dubai"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">${price}</span>
            <input
              type="range"
              min="10"
              max="1000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full accent-blue-500"
            />
          </div>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded w-full"
          >
            Search Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;

import React, { useState } from "react";
import dayjs from "dayjs";

function SearchBar() {
  const [destinationType, setDestinationType] = useState("Trong nước");
  const [priorityLocation, setPriorityLocation] = useState("Biển");
  const [departureList, setDepartureList] = useState([]);
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [price, setPrice] = useState(6000000);
  const [people, setPeople] = useState(3);
  const [interest, setInterest] = useState("Khám phá");

  const locations = [
    "TP. HCM",
    "Hà Nội",
    "Đà Nẵng",
    "Cần Thơ",
    "Hải Phòng",
    "Huế",
  ];

  const getTripDuration = () => {
    if (departureDate && returnDate) {
      const start = dayjs(departureDate);
      const end = dayjs(returnDate);
      const days = end.diff(start, "day") + 1;
      return days > 0 ? days : 0;
    }
    return 0;
  };

  const handleDepartureChange = (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setDepartureList(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalDays = getTripDuration();
    console.log("Search:", {
      destinationType,
      priorityLocation,
      departureList,
      destination,
      departureDate,
      returnDate,
      totalDays,
      price,
      people,
      interest,
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Destination Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Loại điểm đến
          </label>
          <select
            value={destinationType}
            onChange={(e) => setDestinationType(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="Trong nước">Trong nước</option>
            <option value="Nước ngoài">Nước ngoài</option>
          </select>
        </div>

        {/* Priority Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Địa điểm ưu tiên
          </label>
          <select
            value={priorityLocation}
            onChange={(e) => setPriorityLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="Biển">Biển</option>
            <option value="Núi">Núi</option>
            <option value="Thành phố">Thành phố</option>
          </select>
        </div>

        {/* Multiple Departure Points */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Điểm khởi hành (có thể chọn nhiều)
          </label>
          <select
            multiple
            value={departureList}
            onChange={handleDepartureChange}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 h-[130px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Địa điểm muốn đến
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Phú Quốc, Bangkok, Đà Lạt..."
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Dates */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Ngày đi
          </label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Ngày về
          </label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {getTripDuration() > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              Tổng số ngày: {getTripDuration()} ngày
            </p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Ngân sách tối đa/người
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-blue-700">
              {price.toLocaleString()}đ
            </span>
            <input
              type="range"
              min="1000000"
              max="10000000"
              step="500000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
        </div>

        {/* People */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Số người
          </label>
          <input
            type="number"
            min="1"
            value={people}
            onChange={(e) => setPeople(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Interest */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Sở thích
          </label>
          <select
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="Khám phá">Du lịch khám phá</option>
            <option value="Nghỉ dưỡng">Nghỉ dưỡng</option>
            <option value="Ẩm thực">Ẩm thực</option>
          </select>
        </div>

        {/* Submit */}
        <div className="md:col-span-3">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white font-semibold px-6 py-3 rounded-xl w-full transition"
          >
            🔍 Tìm kiếm gợi ý du lịch
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;

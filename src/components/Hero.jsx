import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt, FaCalendar, FaUsers } from "react-icons/fa";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import vi from "date-fns/locale/vi";
import { useHotels } from "../hooks/useHotels";
import { hotelAPI } from "../services/api";
export default function Hero() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      key: "selection",
    },
  ]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    rooms: 1,
  });
  const { getHotels } = useHotels();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!destination) return;

    try {
      setIsLoading(true);
      const response = await getHotels(destination);
      const hotels =
        Array.isArray(response?.byDestination?.hotels) &&
        response?.byDestination?.hotels.length > 0
          ? response?.byDestination?.hotels
          : Array.isArray(response?.byName?.results) &&
            response?.byName?.results.length > 0
          ? response?.byName?.results
          : [];

      navigate("/hotels", {
        state: {
          destination,
          dateRange,
          guests,
          hotels: hotels,
          matchedRegion:
            response?.byDestination?.matched_region ||
            response?.byName?.matched_region,
          count: response?.byDestination?.count || response?.byName?.count,
        },
      });
    } catch (err) {
      console.error("Lỗi khi tìm khách sạn:", err);
      alert("Có lỗi xảy ra khi tìm kiếm khách sạn");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestChange = (type, operation) => {
    setGuests((prev) => ({
      ...prev,
      [type]:
        operation === "increment"
          ? prev[type] + 1
          : Math.max(type === "adults" ? 1 : 0, prev[type] - 1),
    }));
  };

  return (
    <div className="relative">
      {/* Hero Background */}
      <div
        className="h-[600px] bg-cover bg-no-repeat bg-center relative w-full"
        style={{
          backgroundImage: "url('/background.jpg')",
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
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-xl">
          <div className="flex items-center h-16">
            {/* Destination Input */}
            <div className="flex-1 h-full border-r border-gray-200">
              <div className="h-full px-4 flex flex-col justify-center">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <FaMapMarkerAlt className="text-blue-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Thành phố, địa điểm hoặc tên khách sạn"
                    className="w-full pl-8 pr-4 focus:outline-none text-base"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSearch(e);
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="flex-1 h-full border-r border-gray-200">
              <div className="h-full px-4 flex flex-col justify-center">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <FaCalendar className="text-blue-500" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                    className="w-full pl-8 pr-4 focus:outline-none text-base text-left"
                  >
                    {dateRange[0].startDate && dateRange[0].endDate
                      ? `${format(
                          dateRange[0].startDate,
                          "dd/MM/yyyy"
                        )} - ${format(dateRange[0].endDate, "dd/MM/yyyy")}`
                      : "Ngày nhận phòng - Ngày trả phòng"}
                  </button>

                  {/* Date Picker Dropdown */}
                  {isDatePickerOpen && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <DateRange
                        onChange={(item) => setDateRange([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                        months={2}
                        direction="horizontal"
                        locale={vi}
                        minDate={new Date()}
                        maxDate={
                          new Date(new Date().setDate(new Date().getDate() + 1))
                        }
                        rangeColors={["#3b82f6"]}
                        dateDisplayFormat="dd/MM/yyyy"
                      />
                      <div className="p-4 border-t border-gray-200">
                        <button
                          type="button"
                          onClick={() => setIsDatePickerOpen(false)}
                          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                          Xong
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Guests & Rooms */}
            <div className="flex-1 h-full border-r border-gray-200">
              <div className="h-full px-4 flex flex-col justify-center">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <FaUsers className="text-blue-500" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
                    className="w-full pl-8 pr-4 text-left focus:outline-none text-base"
                  >
                    {guests.adults} người lớn, {guests.children} trẻ em,{" "}
                    {guests.rooms} phòng
                  </button>

                  {/* Guests Dropdown */}
                  {isGuestDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-[300px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                      {/* Adults */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm">Người lớn</span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              handleGuestChange("adults", "decrement")
                            }
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">
                            {guests.adults}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleGuestChange("adults", "increment")
                            }
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm">Trẻ em</span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              handleGuestChange("children", "decrement")
                            }
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">
                            {guests.children}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleGuestChange("children", "increment")
                            }
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Rooms */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm">Phòng</span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              handleGuestChange("rooms", "decrement")
                            }
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">
                            {guests.rooms}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleGuestChange("rooms", "increment")
                            }
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Done Button */}
                      <button
                        type="button"
                        onClick={() => setIsGuestDropdownOpen(false)}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                      >
                        Xong
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="px-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`text-white font-medium h-10 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                  isLoading
                    ? "bg-orange-300 cursor-not-allowed"
                    : "bg-orange-400 hover:bg-orange-500"
                }`}
                onClick={handleSearch}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-5 h-5">
                      <div className="h-full w-full border-4 border-l-white border-r-white border-b-white border-t-transparent rounded-full" />
                    </div>
                    <span className="hidden md:inline">Đang tìm...</span>
                  </>
                ) : (
                  <>
                    <FaSearch />
                    <span className="hidden md:inline">Tìm kiếm</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

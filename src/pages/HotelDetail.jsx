import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaMapMarkerAlt,
  FaStar,
  FaWifi,
  FaShower,
  FaUtensils,
  FaPhoneAlt,
} from "react-icons/fa";

const defaultAmenities = [
  "Wifi miễn phí",
  "Bể bơi",
  "Nhà hàng",
  "Phòng gym",
  "Đưa đón sân bay",
];

const formatCurrency = (value) => {
  if (!value) return "Liên hệ";
  const number = Number(value);
  if (Number.isNaN(number)) return value;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

export default function HotelDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotel, destination, dateRange, guests } = location.state || {};

  if (!hotel) {
    return (
      <div className="min-h-screen bg-slate-50">
        <TopBar />
        <Header />
        <main className="pt-32 pb-12">
          <div className="max-w-4xl mx-auto text-center space-y-6 px-4">
            <h1 className="text-3xl font-semibold text-slate-900">
              Không tìm thấy dữ liệu khách sạn
            </h1>
            <p className="text-slate-600">
              Bạn có thể quay lại trang kết quả tìm kiếm hoặc chọn lại điểm đến.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to={destination ? "/hotels" : "/"}
                className="px-6 py-3 bg-cyan-500 text-white rounded-full"
              >
                Quay về
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const heroImage =
    hotel.images?.[0] || hotel.cover_image || "/placeholder-hotel.png";
  const amenities = hotel.amenities || defaultAmenities;
  const shortDescription =
    hotel.description ||
    hotel.summary ||
    "Khách sạn chất lượng cao với dịch vụ tiêu chuẩn và vị trí thuận tiện cho hành trình của bạn.";

  return (
    <div className="font-sans bg-slate-50 min-h-screen">
      <TopBar />
      <Header />
      <main className="pt-16 pb-12 space-y-10">
        <section className="relative">
          <div className="h-[360px] w-full">
            <img
              src={heroImage}
              alt={hotel.name}
              className="w-full h-full object-cover rounded-b-[40px]"
            />
          </div>
          <div className="absolute inset-x-0 top-0 flex justify-between items-center px-6 pt-6">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-white/80 text-slate-900 rounded-2xl shadow"
            >
              Quay lại kết quả
            </button>
            <div className="px-4 py-2 bg-white/80 rounded-2xl shadow text-sm font-semibold">
              {destination ? `Gần ${destination}` : "Khách sạn nổi bật"}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 space-y-8">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-slate-500">
                  Khách sạn đáng tin cậy
                </p>
                <h1 className="text-3xl font-semibold text-slate-900">
                  {hotel.name}
                </h1>
                <div className="flex items-center gap-2 text-slate-500 mt-2">
                  <FaMapMarkerAlt />
                  <span>
                    {hotel.location || hotel.address || "Địa chỉ cập nhật"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaStar className="text-amber-400" />
                  <span className="text-lg font-semibold text-slate-900">
                    {hotel.rating ?? "?"}
                  </span>
                  <span className="text-sm text-slate-500">
                    ({hotel.reviews ?? "0"} đánh giá)
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
                    Giá tham khảo
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatCurrency(hotel.price)}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4 text-slate-600">
                <p>{shortDescription}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
                      Phòng trống
                    </p>
                    <p className="text-xl font-semibold text-slate-900">
                      {hotel.available_rooms ?? "Đang cập nhật"}
                    </p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
                      Đăng ký thêm
                    </p>
                    <p className="text-xl font-semibold text-slate-900">
                      {hotel.rewards ?? "Ưu đãi tùy thời điểm"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-4">
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>Ngày nhận phòng</span>
                  <span>
                    {dateRange
                      ? new Date(dateRange[0]?.startDate).toLocaleDateString(
                          "vi-VN"
                        )
                      : "Chưa chọn"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>Ngày trả phòng</span>
                  <span>
                    {dateRange
                      ? new Date(dateRange[0]?.endDate).toLocaleDateString(
                          "vi-VN"
                        )
                      : "Chưa chọn"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>Số khách</span>
                  <span>
                    {guests
                      ? `${guests.adults} người lớn, ${guests.children} trẻ em`
                      : "Chưa chọn"}
                  </span>
                </div>
                <Link
                  to={hotel.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center bg-orange-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:bg-orange-600 transition"
                >
                  Đặt ngay
                </Link>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="block w-full text-center border border-dashed border-slate-300 py-3 rounded-2xl text-slate-600 font-semibold"
                >
                  Quay lại tìm kiếm
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-slate-900">
                Tiện nghi
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {amenities.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-2xl px-3 py-2 text-sm text-slate-600"
                  >
                    {item === "Wifi miễn phí" ? (
                      <FaWifi className="text-cyan-500" />
                    ) : item === "Phòng gym" ? (
                      <FaShower className="text-cyan-500" />
                    ) : item === "Nhà hàng" ? (
                      <FaUtensils className="text-cyan-500" />
                    ) : (
                      <FaPhoneAlt className="text-cyan-500" />
                    )}
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

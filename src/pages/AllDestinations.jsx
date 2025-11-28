import React, { useState } from "react";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { PlaceCard } from "../components/Places";
import placesData from "../data/places";
import { FaCompass, FaLayerGroup, FaMapMarkerAlt } from "react-icons/fa";

const stats = [
  { label: "Tour trong nước", value: placesData.domestic.length },
  { label: "Tour quốc tế", value: placesData.international.length },
  {
    label: "Điểm đến đa dạng",
    value: [...placesData.domestic, ...placesData.international].length,
  },
];

export default function AllDestinations() {
  const allPlaces = [...placesData.domestic, ...placesData.international];
  const categories = [
    "Tất cả",
    ...Array.from(new Set(allPlaces.map((place) => place.category))),
  ];
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const filteredPlaces =
    selectedCategory === "Tất cả"
      ? allPlaces
      : allPlaces.filter((place) => place.category === selectedCategory);

  return (
    <div className="font-sans bg-slate-50 min-h-screen">
      <TopBar />
      <Header />
      <main className="pt-32 pb-12 space-y-12">
        <section className="bg-white shadow-xl border border-slate-100">
          <div className="max-w-6xl mx-auto px-6 py-16 space-y-6">
            <p className="text-xs tracking-[0.4em] uppercase text-slate-500">
              Khám phá
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Tất cả hành trình đã được chọn lọc
            </h1>
            <p className="text-slate-600 max-w-3xl">
              Cập nhật liên tục những tour trong nước lẫn quốc tế cùng dịch vụ
              hỗ trợ cá nhân hóa. Lọc nhanh theo thể loại để tìm ra chuyến đi
              hợp lý với bạn nhất.
            </p>
            <div className="flex flex-wrap gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-4 bg-slate-100 rounded-2xl px-4 py-3 border border-slate-200"
                >
                  <div className="w-10 h-10 rounded-full bg-white grid place-items-center shadow">
                    <FaLayerGroup className="text-cyan-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-slate-900">
                      {stat.value}
                    </p>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6">
          <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Bộ sưu tập tour
              </h2>
              <p className="text-sm text-slate-500">
                Nhấn chọn từng thể loại để thu hẹp tìm kiếm.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-2xl border font-medium transition ${
                    selectedCategory === category
                      ? "border-cyan-500 bg-cyan-50 text-cyan-600"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </section>

        <section className="bg-[#0f172a] text-white py-16 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">
                Địa điểm nóng
              </p>
              <h3 className="text-3xl font-semibold">
                Đặt tour cùng cố vấn chuyên nghiệp
              </h3>
              <p className="text-slate-200 max-w-2xl">
                Nhóm AmazingTour kết nối bạn với đối tác uy tín để chuẩn bị hành
                trình trước từng bước, từ vé máy bay đến chỗ ăn nghỉ.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-full">
              <FaCompass />
              <span className="text-sm uppercase tracking-[0.4em]">
                Tư vấn ngay
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

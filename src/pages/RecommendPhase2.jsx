// src/pages/RecommendPhase2.jsx
import { Link } from "react-router-dom";

export default function RecommendPhase2() {
  // Giả lập 1 địa điểm gợi ý
  const suggestion = {
    name: "Đà Lạt mộng mơ",
    image: "https://images.unsplash.com/photo-1605164509460-56a47b375008?auto=format&fit=crop&w=900&q=80",
    schedule: [
      "Ngày 1: Tham quan Thung lũng Tình yêu, đi chợ đêm Đà Lạt",
      "Ngày 2: Thăm Vườn hoa, Dinh Bảo Đại, cafe ngắm view đồi",
      "Ngày 3: Trekking Langbiang hoặc thư giãn hồ Tuyền Lâm"
    ]
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-green-700">
        Gợi ý địa điểm và lịch trình du lịch
      </h1>

      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <img src={suggestion.image} alt={suggestion.name} className="w-full h-64 object-cover rounded-lg mb-4" />
        <h2 className="text-xl font-semibold">{suggestion.name}</h2>
        <ul className="list-disc ml-6 mt-3 text-gray-700">
          {suggestion.schedule.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      <Link
        to="/"
        className="block text-center text-blue-600 hover:underline mt-4"
      >
        ← Quay về trang chủ
      </Link>
    </div>
  );
}

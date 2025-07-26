import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecommendPhase1() {
  const [mood, setMood] = useState("");
  const [weather, setWeather] = useState("");
  const [budget, setBudget] = useState(5000);
  const navigate = useNavigate();

  const handleNext = () => {
    // Sau khi "phân tích" xong thì chuyển sang giai đoạn 2
    navigate("/recommend/phase2");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Giai đoạn 1: Bạn có nên đi du lịch?
      </h1>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Tâm trạng hiện tại của bạn là gì?</label>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Chọn --</option>
          <option value="mệt mỏi">Mệt mỏi</option>
          <option value="căng thẳng">Căng thẳng</option>
          <option value="vui vẻ">Vui vẻ</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Bạn muốn thời tiết thế nào?</label>
        <select
          value={weather}
          onChange={(e) => setWeather(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Chọn --</option>
          <option value="mát mẻ">Mát mẻ</option>
          <option value="nắng ấm">Nắng ấm</option>
          <option value="có tuyết">Có tuyết</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Ngân sách dự kiến của bạn:</label>
        <input
          type="range"
          min="1000"
          max="10000"
          step="500"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full"
        />
        <p className="text-center mt-1 text-blue-600 font-bold">{budget}k VNĐ</p>
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
      >
        Tiếp tục đến giai đoạn 2 →
      </button>
    </div>
  );
}

import { useNavigate } from "react-router-dom";

export default function StartRecommendation() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/recommend/phase1");
  };

  return (
    <div className="text-center py-12 bg-blue-50 rounded-xl my-10 shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Hệ thống gợi ý du lịch thông minh
      </h2>
      <p className="text-gray-600 mb-6">
        Bạn chưa biết có nên đi du lịch hay không? Hãy bắt đầu với trợ lý đề
        xuất!
      </p>
      <button
        onClick={handleStart}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition"
      >
        Bắt đầu đề xuất →
      </button>
    </div>
  );
}

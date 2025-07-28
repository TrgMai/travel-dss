import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { commonStyles } from "../styles/common";

export default function RecommendPhase3() {
  const [formData, setFormData] = useState({
    interests: [],
    budget: 6000000
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra data từ các phase trước
    const phase1Data = JSON.parse(localStorage.getItem('phase1Data') || '{}');
    const phase2Data = JSON.parse(localStorage.getItem('phase2Data') || '{}');
    if (!phase1Data.groupType || !phase2Data.location) {
      navigate('/recommend/phase1');
    }
  }, [navigate]);

  const interestOptions = [
    { id: 'nature', label: 'Khám phá thiên nhiên' },
    { id: 'culture', label: 'Văn hóa địa phương' },
    { id: 'food', label: 'Ẩm thực' },
    { id: 'adventure', label: 'Phiêu lưu mạo hiểm' },
    { id: 'relaxation', label: 'Nghỉ dưỡng' },
    { id: 'photography', label: 'Chụp ảnh' },
  ];

  const handleInterestToggle = (interestId) => {
    setFormData(prev => {
      const newInterests = prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId];
      return { ...prev, interests: newInterests };
    });
  };

  const handleBudgetChange = (e) => {
    setFormData(prev => ({
      ...prev,
      budget: parseInt(e.target.value)
    }));
  };

  const formatBudget = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  // Tính phần trăm của giá trị hiện tại
  const calculatePercentage = () => {
    const min = 1000000;
    const max = 10000000;
    return ((formData.budget - min) / (max - min)) * 100;
  };

  const handleNext = () => {
    localStorage.setItem('phase3Data', JSON.stringify(formData));
    navigate("/recommend/result");
  };

  const isFormValid = formData.interests.length > 0;

  return (
    <div className={commonStyles.container}>
      {/* Progress Bar */}
      <div className={commonStyles.progressBar}>
        <div className={commonStyles.progressStep} style={{ width: "60%" }}></div>
      </div>

      <h1 className={commonStyles.title}>
        Bước 3: Sở thích và Ngân sách
      </h1>

      <div className={commonStyles.card}>
        <div className={commonStyles.formGroup}>
          <label className={commonStyles.label}>
            Bạn thích làm gì khi đi du lịch? (Chọn ít nhất 1)
          </label>
          <div className="grid grid-cols-2 gap-3">
            {interestOptions.map(interest => (
              <button
                key={interest.id}
                type="button"
                onClick={() => handleInterestToggle(interest.id)}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  formData.interests.includes(interest.id)
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                {interest.label}
              </button>
            ))}
          </div>
        </div>

        <div className={commonStyles.formGroup}>
          <label className={commonStyles.label}>
            Ngân sách của bạn (mỗi người)
          </label>
          <div className="relative pt-1">
            <input
              type="range"
              min="1000000"
              max="10000000"
              step="500000"
              value={formData.budget}
              onChange={handleBudgetChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-blue-600
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:transition-all
                [&::-webkit-slider-thumb]:duration-150
                [&::-webkit-slider-thumb]:shadow-lg
                [&::-webkit-slider-thumb]:hover:scale-110"
              style={{
                background: `linear-gradient(to right, #2563eb 0%, #2563eb ${calculatePercentage()}%, #e5e7eb ${calculatePercentage()}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span>1M</span>
              <span>5M</span>
              <span>10M</span>
            </div>
          </div>
          <p className="text-center mt-4 text-blue-600 font-semibold text-lg">
            {formatBudget(formData.budget)}
          </p>
        </div>

        <button
          onClick={handleNext}
          disabled={!isFormValid}
          className={`${commonStyles.button} ${
            !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Xem kết quả →
        </button>
      </div>
    </div>
  );
} 
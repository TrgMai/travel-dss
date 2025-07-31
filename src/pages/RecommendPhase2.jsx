// src/pages/RecommendPhase2.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { commonStyles } from "../styles/common";

export default function RecommendPhase2() {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    location: "",
    startingPoints: [{ point: "", people: 1 }]
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Lấy data từ phase 1
    const phase1Data = JSON.parse(localStorage.getItem('phase1Data') || '{}');
    if (!phase1Data.groupType) {
      navigate('/recommend/phase1');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStartingPointChange = (index, field, value) => {
    setFormData(prev => {
      const newStartingPoints = [...prev.startingPoints];
      newStartingPoints[index] = {
        ...newStartingPoints[index],
        [field]: value
      };
      return {
        ...prev,
        startingPoints: newStartingPoints
      };
    });
  };

  const addStartingPoint = () => {
    setFormData(prev => ({
      ...prev,
      startingPoints: [...prev.startingPoints, { point: "", people: 1 }]
    }));
  };

  const removeStartingPoint = (index) => {
    if (formData.startingPoints.length > 1) {
      setFormData(prev => ({
        ...prev,
        startingPoints: prev.startingPoints.filter((_, i) => i !== index)
      }));
    }
  };

  const calculateDuration = () => {
    if (!formData.startDate || !formData.endDate) return null;
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const nights = days - 1;
    return `${days} ngày ${nights} đêm`;
  };

  const getTotalPeople = () => {
    return formData.startingPoints.reduce((sum, point) => sum + Number(point.people), 0);
  };

  const handleNext = () => {
    const duration = calculateDuration();
    if (!duration) return;

    const dataToSave = {
      ...formData,
      duration,
      totalPeople: getTotalPeople()
    };
    
    localStorage.setItem('phase2Data', JSON.stringify(dataToSave));
    navigate("/recommend/phase3");
  };

  const minDate = "2025-06-01";
  const maxDate = "2025-08-31";

  const isFormValid = formData.startDate && 
                     formData.endDate && 
                     formData.location && 
                     new Date(formData.endDate) > new Date(formData.startDate) &&
                     formData.startingPoints.every(sp => sp.point && sp.people > 0) &&
                     getTotalPeople() > 0;

  return (
    <div className={commonStyles.container}>
      {/* Progress Bar */}
      <div className={commonStyles.progressBar}>
        <div className={commonStyles.progressStep} style={{ width: "40%" }}></div>
      </div>

      <h1 className={commonStyles.title}>
        Bước 2: Thời gian và địa điểm
      </h1>

      <div className={commonStyles.card}>
        <div className={commonStyles.formGroup}>
          <label className={commonStyles.label}>Chọn ngày đi</label>
          <input
            type="date"
            name="startDate"
            min={minDate}
            max={maxDate}
            value={formData.startDate}
            onChange={handleChange}
            className={commonStyles.input}
          />
        </div>

        <div className={commonStyles.formGroup}>
          <label className={commonStyles.label}>Chọn ngày về</label>
          <input
            type="date"
            name="endDate"
            min={formData.startDate || minDate}
            max={maxDate}
            value={formData.endDate}
            onChange={handleChange}
            className={commonStyles.input}
          />
        </div>

        {formData.startDate && formData.endDate && (
          <div className="mb-6 p-3 bg-blue-50 rounded-lg text-blue-600">
            <p className="font-medium">
              Thời gian chuyến đi: {calculateDuration()}
            </p>
          </div>
        )}

        <div className={commonStyles.formGroup}>
          <label className={commonStyles.label}>Bạn muốn đi đâu?</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={commonStyles.select}
          >
            <option value="">-- Chọn địa điểm --</option>
            <option value="biển">Biển</option>
            <option value="núi">Núi</option>
            <option value="thành phố">Thành phố</option>
          </select>
        </div>

        <div className={commonStyles.formGroup}>
          <div className="flex items-center justify-between mb-2">
            <label className={commonStyles.label}>Điểm khởi hành</label>
            <button
              type="button"
              onClick={addStartingPoint}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Thêm điểm khởi hành
            </button>
          </div>

          <div className="space-y-4">
            {formData.startingPoints.map((sp, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-grow">
                  <select
                    value={sp.point}
                    onChange={(e) => handleStartingPointChange(index, 'point', e.target.value)}
                    className={commonStyles.select}
                  >
                    <option value="">-- Chọn điểm khởi hành --</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="danang">Đà Nẵng</option>
                  </select>
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    min="1"
                    value={sp.people}
                    onChange={(e) => handleStartingPointChange(index, 'people', parseInt(e.target.value) || 0)}
                    className={commonStyles.input}
                    placeholder="Số người"
                  />
                </div>
                {formData.startingPoints.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStartingPoint(index)}
                    className="p-2 text-red-500 hover:text-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          {getTotalPeople() > 0 && (
            <p className="mt-2 text-sm text-gray-600">
              Tổng số người: {getTotalPeople()} người
            </p>
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={!isFormValid}
          className={`${commonStyles.button} ${
            !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Tiếp tục →
        </button>
      </div>
    </div>
  );
}

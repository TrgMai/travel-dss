import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { commonStyles } from "../styles/common";

export default function RecommendPhase1() {
  const [formData, setFormData] = useState({
    groupType: "",
    groupSize: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    localStorage.setItem("phase1Data", JSON.stringify(formData));
    navigate("/recommend/phase2");
  };

  const isFormValid = formData.groupType && formData.groupSize;

  return (
    <div className={commonStyles.container}>
      {/* Progress Bar */}
      <div className={commonStyles.progressBar}>
        <div
          className={commonStyles.progressStep}
          style={{ width: "20%" }}
        ></div>
      </div>

      <h1 className={commonStyles.title}>Bước 1: Thông tin nhóm du lịch</h1>

      <div className={commonStyles.card}>
        <div className={commonStyles.formGroup}>
          <label className={commonStyles.label}>
            Đối tượng du lịch của bạn là gì?
          </label>
          <select
            name="groupType"
            value={formData.groupType}
            onChange={handleChange}
            className={commonStyles.select}
          >
            <option value="">-- Chọn đối tượng --</option>
            <option value="family">Gia đình</option>
            <option value="friends">Nhóm bạn bè</option>
            <option value="couple">Cặp đôi</option>
            <option value="colleagues">Đồng nghiệp</option>
            <option value="solo">Du lịch một mình</option>
          </select>
        </div>

        <div className={commonStyles.formGroup}>
          <label className={commonStyles.label}>
            Số lượng người trong nhóm
          </label>
          <select
            name="groupSize"
            value={formData.groupSize}
            onChange={handleChange}
            className={commonStyles.select}
          >
            <option value="">-- Chọn số lượng --</option>
            <option value="1">1 người</option>
            <option value="2">2 người</option>
            <option value="3">3 người</option>
            <option value="4">4 người</option>
            <option value="5-10">5-10 người</option>
            <option value="10+">Trên 10 người</option>
          </select>
        </div>

        <button
          onClick={handleNext}
          disabled={!isFormValid}
          className={`${commonStyles.button} ${
            !isFormValid ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Tiếp tục →
        </button>
      </div>
    </div>
  );
}

import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { commonStyles } from "../styles/common";
import { useRecommend } from "../hooks/useRecommend";

export default function RecommendResult() {
  const [allData, setAllData] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [hasCalledApi, setHasCalledApi] = useState(false);
  const navigate = useNavigate();
  const { loading, error, getRecommendations } = useRecommend();

  const callRecommendAPI = useCallback(
    async (payload) => {
      try {
        const result = await getRecommendations(payload);
        return result;
      } catch (err) {
        throw err;
      }
    },
    [getRecommendations]
  );

  useEffect(() => {
    const phase1Data = JSON.parse(localStorage.getItem("phase1Data") || "{}");
    const phase2Data = JSON.parse(localStorage.getItem("phase2Data") || "{}");
    const phase3Data = JSON.parse(localStorage.getItem("phase3Data") || "{}");

    if (
      !phase1Data.groupType ||
      !phase2Data.location ||
      !phase3Data.interests
    ) {
      navigate("/recommend/phase1");
      return;
    }

    const data = { ...phase1Data, ...phase2Data, ...phase3Data };
    if (data.startDate) {
      data.startDate = new Date(data.startDate);
      data.endDate = new Date(data.endDate);
    }
    setAllData(data);

    const startDate = new Date(phase2Data.startDate);
    const endDate = new Date(phase2Data.endDate);
    const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    let soThich = [];
    if (phase2Data.location === "multi") {
      soThich = ["beach", "mountain", "city"];
    } else {
      soThich = [phase2Data.location];
    }

    const apiPayload = {
      ngan_sach: phase3Data.budget || 0,
      so_thich: soThich,
      duration: duration,
    };

    setApiData(apiPayload);
  }, [navigate]);

  const handleFindTour = async () => {
    if (apiData && !hasCalledApi) {
      setHasCalledApi(true);
      try {
        const result = await callRecommendAPI(apiData);
        localStorage.setItem("recommendResult", JSON.stringify(result));
        navigate("/recommend/tour-list");
      } catch (error) {
        console.error("Lỗi khi tìm tour phù hợp:", error);
      }
    }
  };

  if (!allData) return null;

  const formatBudget = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const getGroupTypeText = (type) => {
    const types = {
      family: "Gia đình",
      friends: "Nhóm bạn bè",
      couple: "Cặp đôi",
      colleagues: "Đồng nghiệp",
      solo: "Du lịch một mình",
    };
    return types[type] || type;
  };

  const getLocationText = (loc) => {
    const locations = {
      beach: "Biển",
      mountain: "Núi",
      city: "Thành phố",
      countryside: "Miền quê",
    };
    return locations[loc] || loc;
  };

  const getStartingPointText = (point) => {
    const points = {
      hcm: "TP. Hồ Chí Minh",
      hanoi: "Hà Nội",
      danang: "Đà Nẵng",
    };
    return points[point] || point;
  };

  const getInterestText = (interest) => {
    const interests = {
      nature: "Khám phá thiên nhiên",
      culture: "Văn hóa địa phương",
      food: "Ẩm thực",
      adventure: "Phiêu lưu mạo hiểm",
      relaxation: "Nghỉ dưỡng",
      photography: "Chụp ảnh",
    };
    return interests[interest] || interest;
  };

  return (
    <div className={commonStyles.container}>
      {/* Progress Bar */}
      <div className={commonStyles.progressBar}>
        <div
          className={commonStyles.progressStep}
          style={{ width: "100%" }}
        ></div>
      </div>

      <h1 className={commonStyles.title}>Tổng Hợp Thông Tin Chuyến Đi</h1>

      <div className={commonStyles.card}>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Đối tượng và Số lượng
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="mb-2">
                <span className="font-medium">Loại nhóm:</span>{" "}
                {getGroupTypeText(allData.groupType)}
              </p>
              <p>
                <span className="font-medium">Số người:</span>{" "}
                {allData.groupSize} người
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Thời gian và Địa điểm
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="mb-2">
                <span className="font-medium">Thời gian:</span>{" "}
                {allData.duration}
              </p>
              <p className="mb-2">
                <span className="font-medium">Ngày đi:</span>{" "}
                {formatDate(allData.startDate)}
              </p>
              <p className="mb-2">
                <span className="font-medium">Ngày về:</span>{" "}
                {formatDate(allData.endDate)}
              </p>
              <p className="mb-2">
                <span className="font-medium">Loại hình:</span>{" "}
                {getLocationText(allData.location)}
              </p>
              <div>
                <span className="font-medium">Điểm khởi hành:</span>
                <ul className="mt-2 space-y-1">
                  {allData.startingPoints.map((sp, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <span>• {getStartingPointText(sp.point)}:</span>
                      <span className="font-medium">{sp.people} người</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Sở thích và Ngân sách
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="mb-3">
                <span className="font-medium">Sở thích:</span>
                <span className="flex flex-wrap gap-2 mt-2">
                  {allData.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                    >
                      {getInterestText(interest)}
                    </span>
                  ))}
                </span>
              </div>
              <p>
                <span className="font-medium">Ngân sách/người:</span>{" "}
                {formatBudget(allData.budget)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <button
            type="button"
            onClick={handleFindTour}
            className={commonStyles.button}
          >
            Tìm Tour Phù Hợp →
          </button>
          <Link to="/" className={commonStyles.buttonOutline}>
            ← Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

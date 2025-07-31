import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { commonStyles } from "../styles/common";
import { tourAPI } from "../services/api";

const TourCard = ({ tour }) => {
  const navigate = useNavigate();
  const matchPercentage = (tour.match_score * 100).toFixed(0);
  const tourId = tour.link.split("/").pop();

  const matchLocation = tour.link.match(/tour-([a-z\-]+?)(-|\/)/i);
  const location = matchLocation ? matchLocation[1] : null; // 'nha-trang'

  const handleViewDetail = async (e) => {
    e.preventDefault();
    try {
      const response = await tourAPI.postBuildSchedule({
        tour_id: tourId,
        location: location,
      });
      navigate(`/tour/${tourId}`, { state: { tourData: response } });
    } catch (error) {
      console.error("Error fetching tour details:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl duration-300">
      <div className="relative">
        <img
          src="/tour-placeholder.jpg"
          alt={tour.tour_name}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white/95 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 shadow-sm">
          <FaStar className="text-yellow-500" />
          <span className="text-blue-600">{matchPercentage}% phù hợp</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-4 line-clamp-2 min-h-[3.5rem] hover:text-blue-600 transition-colors">
          {tour.tour_name}
        </h3>

        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Giá từ</p>
            <p className="text-lg font-bold text-blue-600">{tour.price}</p>
          </div>
          <button
            onClick={handleViewDetail}
            className="px-3 py-1.5 bg-blue-600 text-white whitespace-nowrap rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default function TourList() {
  const navigate = useNavigate();
  const [recommendedTours, setRecommendedTours] = useState([]);

  useEffect(() => {
    const recommendResult = localStorage.getItem("recommendResult");
    if (!recommendResult) {
      navigate("/recommend/phase1");
      return;
    }

    try {
      const result = JSON.parse(recommendResult);
      setRecommendedTours(result);
    } catch (error) {
      console.error("Error parsing recommendation result:", error);
      navigate("/recommend/phase1");
    }
  }, [navigate]);

  if (recommendedTours.length === 0) {
    return (
      <div className={commonStyles.container}>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Không tìm thấy tour phù hợp
          </h2>
          <p className="text-gray-600 mb-6">
            Xin lỗi, hiện tại chúng tôi không có tour nào phù hợp với yêu cầu
            của bạn.
          </p>
          <Link to="/recommend/phase1" className={commonStyles.buttonOutline}>
            Thử lại với tiêu chí khác
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={commonStyles.container}>
      <div className="mb-8">
        <h1 className={commonStyles.title}>Tour Du Lịch Phù Hợp Cho Bạn</h1>
        <p className="text-center text-gray-600">
          Dựa trên sở thích và yêu cầu của bạn, chúng tôi đề xuất những tour sau
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedTours?.results?.map((tour, index) => (
          <TourCard key={index} tour={tour} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to="/recommend/phase1" className={commonStyles.buttonOutline}>
          Tìm tour khác
        </Link>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaClock, FaRegCalendarAlt } from "react-icons/fa";
import { tours } from "../data/tours";
import { commonStyles } from "../styles/common";

const TourCard = ({ tour }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-1 duration-300">
      <div className="relative">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-1">
          <FaStar className="text-yellow-400" />
          <span>{tour.rating}</span>
          <span className="text-gray-500 text-xs">({tour.reviews})</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {tour.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-blue-500" />
            <span className="text-sm">{tour.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaClock className="text-blue-500" />
            <span className="text-sm">{tour.duration}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tour.highlights.slice(0, 3).map((highlight, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
            >
              {highlight}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Giá từ</p>
            <p className="text-lg font-bold text-blue-600">
              {formatPrice(tour.price)}
            </p>
          </div>
          <Link
            to={`/tour/${tour.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function TourList() {
  const [recommendedTours, setRecommendedTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy thông tin từ localStorage
    const phase2Data = JSON.parse(localStorage.getItem('phase2Data') || '{}');
    if (!phase2Data.location) {
      navigate('/recommend/phase1');
      return;
    }

    // Lấy danh sách tour theo loại địa điểm
    const locationTours = tours[phase2Data.location] || [];
    setRecommendedTours(locationTours);
  }, [navigate]);

  if (recommendedTours.length === 0) {
    return (
      <div className={commonStyles.container}>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Không tìm thấy tour phù hợp
          </h2>
          <p className="text-gray-600 mb-6">
            Xin lỗi, hiện tại chúng tôi không có tour nào phù hợp với yêu cầu của bạn.
          </p>
          <Link
            to="/recommend/phase1"
            className={commonStyles.buttonOutline}
          >
            Thử lại với tiêu chí khác
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={commonStyles.container}>
      <div className="mb-8">
        <h1 className={commonStyles.title}>
          Tour Du Lịch Phù Hợp Cho Bạn
        </h1>
        <p className="text-center text-gray-600">
          Dựa trên sở thích và yêu cầu của bạn, chúng tôi đề xuất những tour sau
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedTours.map(tour => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/recommend/phase1"
          className={commonStyles.buttonOutline}
        >
          Tìm tour khác
        </Link>
      </div>
    </div>
  );
} 
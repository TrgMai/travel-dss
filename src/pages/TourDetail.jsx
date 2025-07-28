import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaClock, FaRegCalendarAlt, FaCheck } from "react-icons/fa";
import { tours } from "../data/tours";
import { commonStyles } from "../styles/common";

export default function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    // Tìm tour theo id
    const foundTour = Object.values(tours)
      .flat()
      .find(t => t.id === id);

    if (!foundTour) {
      navigate('/');
      return;
    }

    setTour(foundTour);
  }, [id, navigate]);

  if (!tour) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="p-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {tour.title}
            </h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <span>{tour.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                <span>{tour.rating}</span>
                <span className="text-sm">({tour.reviews} đánh giá)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className={commonStyles.card}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Giới thiệu tour
            </h2>
            <p className="text-gray-600">
              {tour.description}
            </p>
          </div>

          {/* Highlights */}
          <div className={commonStyles.card}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Điểm nhấn hành trình
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {tour.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <FaCheck className="text-blue-600" />
                  </div>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className={commonStyles.card}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Lịch trình tour
            </h2>
            <div className="space-y-6">
              {tour.schedule.map((day, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {day.day}
                  </h3>
                  <ul className="space-y-2 pl-6">
                    {day.activities.map((activity, actIndex) => (
                      <li
                        key={actIndex}
                        className="text-gray-600 list-disc"
                      >
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Includes */}
          <div className={commonStyles.card}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Dịch vụ bao gồm
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {tour.includes.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <FaCheck className="text-green-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price Card */}
          <div className={commonStyles.card}>
            <div className="text-center">
              <p className="text-gray-600">Giá chỉ từ</p>
              <p className="text-3xl font-bold text-blue-600 my-2">
                {formatPrice(tour.price)}
              </p>
              <p className="text-sm text-gray-500 mb-6">
                /người
              </p>
              <button className={`${commonStyles.button} w-full`}>
                Đặt tour ngay
              </button>
            </div>
          </div>

          {/* Contact Card */}
          <div className={commonStyles.card}>
            <h3 className="font-semibold text-gray-800 mb-4">
              Bạn cần hỗ trợ?
            </h3>
            <div className="space-y-4">
              <p className="text-gray-600">
                Gọi ngay hotline:
                <a href="tel:1900123456" className="text-blue-600 font-semibold block">
                  1900 123 456
                </a>
              </p>
              <p className="text-gray-600">
                Hoặc email:
                <a href="mailto:support@amazingtour.vn" className="text-blue-600 font-semibold block">
                  support@amazingtour.vn
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
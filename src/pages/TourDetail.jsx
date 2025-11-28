import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { commonStyles } from "../styles/common";
import { tourAPI } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        if (location.state?.tourData) {
          setTour(location.state.tourData);
          return;
        }

        const response = await tourAPI.postBuildSchedule({
          tour_id: id,
          location: location,
        });
        setTour(response);
      } catch (error) {
        console.error("Error fetching tour details:", error);
        navigate("/");
      }
    };

    fetchTourData();
  }, [id, navigate, location.state]);

  if (!tour) return null;

  return (
    <div className="font-sans bg-slate-50 min-h-screen">
      <TopBar />
      <Header />
      <main className="pt-32 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero Section */}
          <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
            <img
              src={tour?.tour?.gallery?.[4] || "/tour-placeholder.jpg"}
              alt={tour?.tour?.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-end">
              <div className="p-8 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {tour?.tour?.name}
                </h1>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt />
                    <span>Nha Trang - Đà Lạt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span>4 ngày 3 đêm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {tour?.tour?.gallery?.slice(2, 10).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Tour image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <div className={commonStyles.card}>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Tổng quan tour
                </h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {tour?.tour?.overview}
                </p>
              </div>

              {/* Schedule */}
              <div className={commonStyles.card}>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Lịch trình tour
                </h2>
                <div className="space-y-8">
                  {tour?.schedule?.map((day, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-blue-500 pl-4"
                    >
                      <h3 className="font-bold text-gray-800 mb-3 text-lg">
                        {day.day.split("\n")[0]}
                      </h3>
                      <div className="text-gray-600 whitespace-pre-line">
                        {day.detail}
                      </div>
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
                  <div className="flex items-center justify-center gap-1 my-2">
                    <p className="text-3xl font-bold text-blue-600">
                      {tour?.tour?.price?.replace("x ", "")}
                    </p>
                    <span className="text-gray-500">VNĐ</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">/người</p>
                  <button
                    onClick={() => {
                      if (!isAuthenticated()) {
                        navigate("/login", { state: { from: location } });
                      } else {
                        navigate("/payment", {
                          state: { tourData: tour },
                        });
                      }
                    }}
                    className={`${commonStyles.button} w-full block text-center`}
                  >
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
                    <a
                      href="tel:1900123456"
                      className="text-blue-600 font-semibold block"
                    >
                      1900 123 456
                    </a>
                  </p>
                  <p className="text-gray-600">
                    Hoặc truy cập:
                    <a
                      href={`https://www.ivivu.com${tour?.tour?.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-semibold block truncate"
                    >
                      {`https://www.ivivu.com${tour?.tour?.url}`}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

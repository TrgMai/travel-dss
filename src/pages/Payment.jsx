import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { commonStyles } from "../styles/common";
import {
  FaCheck,
  FaCreditCard,
  FaUser,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";

const steps = [
  { id: 1, name: "Thông tin đặt tour", icon: FaCalendarAlt },
  { id: 2, name: "Thông tin khách hàng", icon: FaUser },
  { id: 3, name: "Thanh toán", icon: FaCreditCard },
  { id: 4, name: "Xác nhận", icon: FaCheck },
];

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const tourData = location.state?.tourData;

  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    // Step 1: Tour booking info
    numberOfAdults: 2,
    numberOfChildren: 0,
    departureDate: "",

    // Step 2: Customer info
    contactName: user?.fullName || "",
    contactPhone: user?.phone || "",
    contactEmail: user?.email || "",
    notes: "",

    // Step 3: Payment
    paymentMethod: "bank_transfer", // bank_transfer, credit_card, cash
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!tourData) {
      navigate("/");
    }
  }, [tourData, navigate]);

  // Update booking data when user becomes available
  useEffect(() => {
    if (user && currentStep === 1) {
      setBookingData((prev) => ({
        ...prev,
        contactName: user.fullName || prev.contactName,
        contactPhone: user.phone || prev.contactPhone,
        contactEmail: user.email || prev.contactEmail,
      }));
    }
  }, [user, currentStep]);

  if (!tourData) return null;

  const pricePerPerson = parseInt(
    tourData?.tour?.price?.replace(/[^\d]/g, "") || "0"
  );
  const totalPrice =
    pricePerPerson *
    (bookingData.numberOfAdults + bookingData.numberOfChildren * 0.5);

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!bookingData.departureDate) {
        alert("Vui lòng chọn ngày khởi hành");
        return;
      }
    }
    if (currentStep === 2) {
      if (
        !bookingData.contactName ||
        !bookingData.contactPhone ||
        !bookingData.contactEmail
      ) {
        alert("Vui lòng điền đầy đủ thông tin liên hệ");
        return;
      }
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(4);
    }, 2000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Thông tin tour
              </h3>
              <div className="space-y-2 text-gray-600">
                <p className="font-semibold text-gray-800">
                  {tourData?.tour?.name}
                </p>
                <p>
                  Giá: {tourData?.tour?.price?.replace("x ", "")} VNĐ / người
                </p>
              </div>
            </div>

            <div className={commonStyles.formGroup}>
              <label className={commonStyles.label}>Số người lớn</label>
              <input
                type="number"
                name="numberOfAdults"
                min="1"
                value={bookingData.numberOfAdults}
                onChange={handleInputChange}
                className={commonStyles.input}
              />
            </div>

            <div className={commonStyles.formGroup}>
              <label className={commonStyles.label}>
                Số trẻ em (dưới 12 tuổi)
              </label>
              <input
                type="number"
                name="numberOfChildren"
                min="0"
                value={bookingData.numberOfChildren}
                onChange={handleInputChange}
                className={commonStyles.input}
              />
              <p className="text-sm text-gray-500 mt-1">
                Trẻ em được giảm 50% giá tour
              </p>
            </div>

            <div className={commonStyles.formGroup}>
              <label className={commonStyles.label}>Ngày khởi hành</label>
              <input
                type="date"
                name="departureDate"
                value={bookingData.departureDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
                required
                className={commonStyles.input}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">Tổng tiền:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className={commonStyles.formGroup}>
              <label className={commonStyles.label}>
                Họ và tên người liên hệ *
              </label>
              <input
                type="text"
                name="contactName"
                value={bookingData.contactName}
                onChange={handleInputChange}
                required
                className={commonStyles.input}
                placeholder="Nhập họ và tên"
              />
            </div>

            <div className={commonStyles.formGroup}>
              <label className={commonStyles.label}>Số điện thoại *</label>
              <input
                type="tel"
                name="contactPhone"
                value={bookingData.contactPhone}
                onChange={handleInputChange}
                required
                className={commonStyles.input}
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div className={commonStyles.formGroup}>
              <label className={commonStyles.label}>Email *</label>
              <input
                type="email"
                name="contactEmail"
                value={bookingData.contactEmail}
                onChange={handleInputChange}
                required
                className={commonStyles.input}
                placeholder="Nhập email"
              />
            </div>

            <div className={commonStyles.formGroup}>
              <label className={commonStyles.label}>Ghi chú (nếu có)</label>
              <textarea
                name="notes"
                value={bookingData.notes}
                onChange={handleInputChange}
                rows="4"
                className={commonStyles.input}
                placeholder="Ghi chú thêm về yêu cầu đặc biệt..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Tóm tắt đặt tour
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  <span className="font-semibold">Tour:</span>{" "}
                  {tourData?.tour?.name}
                </p>
                <p>
                  <span className="font-semibold">Ngày khởi hành:</span>{" "}
                  {new Date(bookingData.departureDate).toLocaleDateString(
                    "vi-VN"
                  )}
                </p>
                <p>
                  <span className="font-semibold">Số người lớn:</span>{" "}
                  {bookingData.numberOfAdults}
                </p>
                <p>
                  <span className="font-semibold">Số trẻ em:</span>{" "}
                  {bookingData.numberOfChildren}
                </p>
                <p>
                  <span className="font-semibold">Người liên hệ:</span>{" "}
                  {bookingData.contactName}
                </p>
                <p>
                  <span className="font-semibold">SĐT:</span>{" "}
                  {bookingData.contactPhone}
                </p>
              </div>
            </div>

            <div className={commonStyles.formGroup}>
              <label className={commonStyles.label}>
                Phương thức thanh toán
              </label>
              <select
                name="paymentMethod"
                value={bookingData.paymentMethod}
                onChange={handleInputChange}
                className={commonStyles.select}
              >
                <option value="bank_transfer">Chuyển khoản ngân hàng</option>
                <option value="credit_card">Thẻ tín dụng/Ghi nợ</option>
                <option value="cash">Thanh toán tại văn phòng</option>
              </select>
            </div>

            {bookingData.paymentMethod === "bank_transfer" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Thông tin chuyển khoản
                </h4>
                <p className="text-sm text-gray-600">
                  <strong>Số tài khoản:</strong> 1234567890
                  <br />
                  <strong>Chủ tài khoản:</strong> CÔNG TY AMAZING TOUR
                  <br />
                  <strong>Ngân hàng:</strong> Vietcombank
                  <br />
                  <strong>Nội dung:</strong> Đặt tour {tourData?.tour?.name}
                </p>
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Lưu ý:</strong> Sau khi thanh toán, vui lòng gửi biên
                lai qua email hoặc gọi hotline 1900 123 456 để xác nhận.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">
                  Tổng thanh toán:
                </span>
                <span className="text-2xl font-bold text-green-600">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <FaCheck className="text-green-600 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Đặt tour thành công!
            </h2>
            <p className="text-gray-600">
              Chúng tôi đã nhận được yêu cầu đặt tour của bạn. Nhân viên sẽ liên
              hệ với bạn trong vòng 24 giờ để xác nhận.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-2">
                Mã đặt tour: #DT{Date.now().toString().slice(-8)}
              </h3>
              <p className="text-sm text-gray-600">
                Vui lòng lưu mã này để tra cứu thông tin đặt tour.
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate("/")}
                className={commonStyles.button}
              >
                Về trang chủ
              </button>
              <button
                onClick={() => navigate("/tour/" + tourData?.tour?.id)}
                className={commonStyles.buttonOutline}
              >
                Xem lại tour
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <ProtectedRoute>
      <div className="font-sans bg-slate-50 min-h-screen">
        <TopBar />
        <Header />
        <main className="pt-32 pb-12">
          <div className="max-w-4xl mx-auto px-4">
            {/* Step indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;

                  return (
                    <div key={step.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : isCompleted
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {isCompleted ? <FaCheck /> : <Icon />}
                        </div>
                        <p
                          className={`mt-2 text-sm text-center ${
                            isActive
                              ? "font-semibold text-blue-600"
                              : "text-gray-600"
                          }`}
                        >
                          {step.name}
                        </p>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`h-1 flex-1 mx-2 ${
                            isCompleted ? "bg-green-500" : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className={commonStyles.card}>{renderStepContent()}</div>

            {/* Navigation buttons */}
            {currentStep < 4 && (
              <div className="flex justify-between gap-4 mt-6">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`${commonStyles.buttonOutline} ${
                    currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Quay lại
                </button>
                {currentStep === 3 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={commonStyles.button}
                  >
                    {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt tour"}
                  </button>
                ) : (
                  <button onClick={handleNext} className={commonStyles.button}>
                    Tiếp tục
                  </button>
                )}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}

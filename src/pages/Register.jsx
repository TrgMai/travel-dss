import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { commonStyles } from "../styles/common";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { authAPI } from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await authAPI.register(registerData);
      login(response.user, response.token);

      // Redirect to home after successful registration
      navigate("/", { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Đăng ký thất bại. Vui lòng thử lại sau."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-sans bg-slate-50 min-h-screen">
      <TopBar />
      <Header />
      <main className="pt-32 pb-12">
        <div className="max-w-md mx-auto px-4">
          <div className={commonStyles.card}>
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Đăng ký tài khoản
            </h1>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className={commonStyles.formGroup}>
                <label htmlFor="fullName" className={commonStyles.label}>
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className={commonStyles.input}
                  placeholder="Nhập họ và tên"
                />
              </div>

              <div className={commonStyles.formGroup}>
                <label htmlFor="email" className={commonStyles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={commonStyles.input}
                  placeholder="Nhập email của bạn"
                />
              </div>

              <div className={commonStyles.formGroup}>
                <label htmlFor="phone" className={commonStyles.label}>
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={commonStyles.input}
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div className={commonStyles.formGroup}>
                <label htmlFor="password" className={commonStyles.label}>
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={commonStyles.input}
                  placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                />
              </div>

              <div className={commonStyles.formGroup}>
                <label htmlFor="confirmPassword" className={commonStyles.label}>
                  Xác nhận mật khẩu
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={commonStyles.input}
                  placeholder="Nhập lại mật khẩu"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={commonStyles.button}
              >
                {isLoading ? "Đang đăng ký..." : "Đăng ký"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Đã có tài khoản?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

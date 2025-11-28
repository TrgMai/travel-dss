import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { commonStyles } from "../styles/common";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { authAPI } from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || "/";

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
    setIsLoading(true);

    try {
      const response = await authAPI.login(formData);
      login(response.user, response.token);

      // Redirect to the page user was trying to access, or home
      navigate(from, { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin."
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
              Đăng nhập
            </h1>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Nhập mật khẩu"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={commonStyles.button}
              >
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Chưa có tài khoản?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Đăng ký ngay
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

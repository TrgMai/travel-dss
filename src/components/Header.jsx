import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const navLinks = [
  { label: "Khám phá", to: "/" },
  { label: "Địa điểm HOT", to: "/recommend/tour-list" },
  { label: "Đánh giá", to: "/recommend/result" },
  { label: "Giới thiệu", to: "/about" },
  { label: "Liên hệ", to: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const isHomePage = location.pathname === "/";
  const useTransparentHeader = isHomePage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        useTransparentHeader ? "bg-transparent" : "bg-white shadow-lg"
      }`}
    >
      <div
        className={`py-2 px-8 flex justify-between items-center max-w-6xl mx-auto ${
          useTransparentHeader
            ? "border-b border-white/10"
            : "border-b border-slate-200"
        }`}
      >
        <div
          className={`text-2xl font-bold flex items-center tracking-tight ${
            useTransparentHeader ? "text-white" : "text-[#06b6d4]"
          }`}
        >
          <img
            src="/logo.png"
            alt="AmazingTour Logo"
            className={`inline-block h-14 mr-2 rounded-full ${
              useTransparentHeader ? "" : "drop-shadow-md"
            }`}
          />
          AmazingTour
        </div>
        <nav className="space-x-6 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`hover:text-blue-400 transition-colors ${
                useTransparentHeader ? "text-white" : "text-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {isAuthenticated() ? (
          <div className="flex items-center gap-3">
            <span
              className={`text-sm ${
                useTransparentHeader ? "text-white" : "text-gray-700"
              }`}
            >
              Xin chào, {user?.fullName || "Người dùng"}
            </span>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className={`px-4 py-2 rounded transition-colors font-semibold ${
                useTransparentHeader
                  ? "bg-white text-[#06b6d4] hover:bg-blue-50"
                  : "bg-[#06b6d4] text-white hover:bg-cyan-600"
              }`}
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className={`px-4 py-2 rounded transition-colors font-semibold ${
                useTransparentHeader
                  ? "text-white hover:bg-white/10"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className={`px-4 py-2 rounded transition-colors font-semibold ${
                useTransparentHeader
                  ? "bg-white text-[#06b6d4] hover:bg-blue-50"
                  : "bg-[#06b6d4] text-white hover:bg-cyan-600"
              }`}
            >
              Đăng ký
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

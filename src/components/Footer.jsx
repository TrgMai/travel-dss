import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaTelegram,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";

const FooterSection = ({ title, links }) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-white">{title}</h3>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-white hover:underline transition-colors"
          >
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  const footerLinks = {
    about: [
      "Về Chúng Tôi",
      "Cách Đặt Tour",
      "Liên Hệ",
      "Trợ Giúp",
      "Tuyển Dụng",
    ],
    products: ["Tour Trong Nước", "Tour Quốc Tế", "Điểm Tham Quan"],
    partners: [
      "Đăng Ký Đối Tác Tour",
      "Chương Trình Liên Kết",
      "Đại Lý Du Lịch",
    ],
    legal: [
      "Điều Khoản & Điều Kiện",
      "Quy Chế Hoạt Động",
      "Chính Sách Bảo Mật",
      "Quyền Riêng Tư",
      "Chương Trình Khuyến Mãi",
    ],
  };

  return (
    <footer className="bg-[#1c2930] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b">
          <FooterSection title="Về AmazingTour" links={footerLinks.about} />
          <FooterSection title="Sản Phẩm" links={footerLinks.products} />
          <FooterSection title="Đối Tác" links={footerLinks.partners} />
          <FooterSection title="Điều Khoản" links={footerLinks.legal} />
        </div>

        {/* Payment Methods & Social */}
        <div className="py-8 border-b">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* App Download */}
            <div className="">
              <h3 className="font-semibold text-white mb-4">
                Tải Ứng Dụng AmazingTour
              </h3>
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                  <FaApple size={24} />
                  <div className="text-left">
                    <div className="text-xs">Tải về trên</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                  <FaGooglePlay size={24} />
                  <div className="text-left">
                    <div className="text-xs">Tải về trên</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">
                Theo Dõi Chúng Tôi
              </h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-pink-600 transition-colors"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-black transition-colors"
                >
                  <FaTiktok size={20} />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-red-600 transition-colors"
                >
                  <FaYoutube size={20} />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <FaTelegram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-sm">
          <p className="mb-2 text-gray-400">
            Công ty TNHH AmazingTour Việt Nam | Mã số doanh nghiệp: 0123456789
          </p>
          <p className="mb-2 text-gray-400">
            Địa chỉ: Tầng 1, Tòa nhà Amazing, 123 Đường ABC, Quận XYZ, TP.HCM
          </p>
          <p className="text-white text-center">
            @2025 Copyright by ThanhLoan.
          </p>
        </div>
      </div>
    </footer>
  );
}

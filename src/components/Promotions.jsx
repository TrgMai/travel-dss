import React from 'react';
import { FaRegCopy, FaCheck } from 'react-icons/fa';

const PromotionCard = ({ title, description, code }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4 flex-grow">{description}</p>
      <div className="flex items-center gap-2">
        <div className="flex-grow bg-gray-50 px-3 py-2 rounded border border-gray-200">
          <code className="text-blue-600 font-medium">{code}</code>
        </div>
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded ${
            copied 
              ? 'bg-green-50 text-green-600' 
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
        >
          {copied ? <FaCheck /> : <FaRegCopy />}
        </button>
      </div>
    </div>
  );
};

export default function Promotions() {
  const promotions = [
    {
      title: "Giảm ngay 500K",
      description: "Áp dụng cho đặt tour lần đầu trên ứng dụng AmazingTour",
      code: "CHAOBAN500K"
    },
    {
      title: "Giảm 15% Tour Trong Nước",
      description: "Áp dụng cho tất cả tour du lịch nội địa, tối đa 1 triệu đồng",
      code: "TOURVIET15"
    },
    {
      title: "Giảm 20% Tour Quốc Tế",
      description: "Áp dụng cho tour quốc tế, tối đa 2 triệu đồng",
      code: "GLOBAL20"
    },
    {
      title: "Ưu đãi Nhóm",
      description: "Giảm thêm 10% cho nhóm từ 5 người trở lên",
      code: "GROUP10"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Ưu Đãi Đặc Biệt
          </h2>
          <p className="text-gray-600">
            Những mã giảm giá độc quyền dành cho bạn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promotions.map((promo, index) => (
            <PromotionCard key={index} {...promo} />
          ))}
        </div>
      </div>
    </section>
  );
} 
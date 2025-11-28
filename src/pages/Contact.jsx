import React, { useState } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const contactChannels = [
  {
    title: "Tổng đài tư vấn",
    value: "1900 1888",
    detail: "Phục vụ 24/7 - Gọi miễn phí trong nước",
    icon: <FaPhoneAlt className="text-xl text-orange-500" />,
  },
  {
    title: "Email hỗ trợ",
    value: "hello@amazingtour.vn",
    detail: "Phản hồi nhanh trong vòng 4h làm việc",
    icon: <FaEnvelope className="text-xl text-orange-500" />,
  },
  {
    title: "Văn phòng chính",
    value: "123 Đường ABC, Quận XYZ, TP.HCM",
    detail: "Làm việc từ 08:00 - 20:00 mỗi ngày",
    icon: <FaMapMarkerAlt className="text-xl text-orange-500" />,
  },
];

const socialLinks = [
  { icon: <FaFacebookF />, label: "Facebook" },
  { icon: <FaInstagram />, label: "Instagram" },
  { icon: <FaYoutube />, label: "YouTube" },
  { icon: <FaTiktok />, label: "TikTok" },
];

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("Chúng tôi đã nhận yêu cầu và sẽ liên hệ lại trong 24h.");
    event.target.reset();
  };

  return (
    <div className="font-sans bg-slate-50 min-h-screen">
      <TopBar />
      <Header />
      <main className="pt-16 pb-12 space-y-12">
        <section className="bg-gradient-to-r from-[#0f172a] to-[#112335] text-white">
          <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col gap-6">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-cyan-300">
                Liên hệ
              </p>
              <h1 className="text-4xl md:text-5xl font-bold">
                Đội ngũ AmazingTour luôn sẵn sàng kết nối với bạn
              </h1>
            </div>
            <p className="max-w-3xl text-slate-200">
              Bạn cần tư vấn tour, hỗ trợ đặt dịch vụ hoặc phản hồi trải nghiệm?
              Hãy để chúng tôi chăm sóc từng chi tiết nhỏ nhất. Chỉ cần để lại
              thông tin, chuyên viên sẽ gọi lại theo lịch bạn chọn.
            </p>
            <div className="inline-flex items-center gap-3 text-sm text-slate-200">
              <FaClock /> Hỗ trợ 24/7
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 grid gap-6 md:grid-cols-3">
          {contactChannels.map((channel) => (
            <article
              key={channel.title}
              className="bg-white rounded-3xl p-6 shadow-lg flex flex-col gap-3 border border-slate-100"
            >
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center">
                {channel.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {channel.title}
              </h3>
              <p className="text-2xl font-bold text-slate-900">
                {channel.value}
              </p>
              <p className="text-sm text-slate-500">{channel.detail}</p>
            </article>
          ))}
        </section>

        <section className="max-w-6xl mx-auto px-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Gửi yêu cầu cho chúng tôi
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Điền biểu mẫu bên dưới để bật thông báo, hỗ trợ khẩn cấp hoặc đặt
              lịch nói chuyện với chuyên gia du lịch.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm text-slate-600">Họ và tên</label>
                <input
                  required
                  type="text"
                  className="w-full mt-2 px-4 py-3 border rounded-2xl border-slate-200 focus:border-cyan-400 focus:outline-none"
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">Email</label>
                <input
                  required
                  type="email"
                  className="w-full mt-2 px-4 py-3 border rounded-2xl border-slate-200 focus:border-cyan-400 focus:outline-none"
                  placeholder="ban@example.com"
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">Số điện thoại</label>
                <input
                  required
                  type="tel"
                  className="w-full mt-2 px-4 py-3 border rounded-2xl border-slate-200 focus:border-cyan-400 focus:outline-none"
                  placeholder="+84 9..."
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">
                  Nội dung yêu cầu
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full mt-2 px-4 py-3 border rounded-2xl border-slate-200 focus:border-cyan-400 focus:outline-none"
                  placeholder="Bạn muốn khám phá đâu? Bạn cần hỗ trợ gì?"
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-orange-400 text-black rounded-2xl font-semibold shadow-lg hover:bg-orange-500 transition"
                >
                  Gửi yêu cầu
                </button>
                <p className="text-xs text-slate-500">
                  Chúng tôi cam kết phản hồi trong 24h làm việc.
                </p>
              </div>
              {status && (
                <p className="text-sm text-green-600 border border-green-100 rounded-2xl px-4 py-2">
                  {status}
                </p>
              )}
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Kết nối nhanh
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <button
                    key={social.label}
                    className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition"
                  >
                    {social.icon}
                    {social.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0f172a] to-[#112335] text-white rounded-3xl p-6 space-y-3 shadow-xl">
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">
                Hỗ trợ nhanh
              </p>
              <h3 className="text-2xl font-semibold">
                Tư vấn gói tour trong 1 phút
              </h3>
              <p className="text-sm text-slate-100">
                Gọi hotline hoặc gửi tin nhắn, chuyên viên sẽ chọn lịch hẹn phù
                hợp để phối hợp cùng bạn xây dựng chuyến đi mong muốn.
              </p>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em]">
                <FaClock />
                Hỗ trợ 24/7
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-inner p-6">
            <p className="text-sm text-slate-500 mb-2">Địa điểm trải nghiệm:</p>
            <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-700">
              <span className="px-4 py-2 border border-slate-200 rounded-full bg-slate-100">
                Hà Nội
              </span>
              <span className="px-4 py-2 border border-slate-200 rounded-full bg-slate-100">
                Đà Nẵng
              </span>
              <span className="px-4 py-2 border border-slate-200 rounded-full bg-slate-100">
                Phú Quốc
              </span>
              <span className="px-4 py-2 border border-slate-200 rounded-full bg-slate-100">
                Seoul
              </span>
              <span className="px-4 py-2 border border-slate-200 rounded-full bg-slate-100">
                Nhật Bản
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

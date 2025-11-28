import React from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaCompass,
  FaRegHandshake,
  FaGlobe,
  FaShieldAlt,
  FaLeaf,
} from "react-icons/fa";

const stats = [
  { label: "Điểm đến", value: "120+" },
  { label: "Khách hàng hài lòng", value: "150k+" },
  { label: "Giải thưởng", value: "30" },
];

const values = [
  {
    title: "Đồng hành tận tâm",
    description:
      "Chúng tôi lắng nghe từng mong muốn và phản hồi để cá nhân hóa hành trình cho mỗi du khách.",
    icon: <FaRegHandshake className="text-3xl text-[#06b6d4]" />,
  },
  {
    title: "Tiêu chuẩn an toàn",
    description:
      "Đội ngũ chuyên viên kiểm duyệt từng đối tác, đảm bảo mọi hoạt động đều an toàn và minh bạch.",
    icon: <FaShieldAlt className="text-3xl text-[#06b6d4]" />,
  },
  {
    title: "Trải nghiệm bền vững",
    description:
      "AmazingTour thúc đẩy du lịch có trách nhiệm, đồng hành cùng cộng đồng địa phương và môi trường.",
    icon: <FaLeaf className="text-3xl text-[#06b6d4]" />,
  },
  {
    title: "Công nghệ thông minh",
    description:
      "Nền tảng số hỗ trợ gợi ý điểm đến phù hợp, đồng thời cá nhân hóa mọi bước trong hành trình.",
    icon: <FaGlobe className="text-3xl text-[#06b6d4]" />,
  },
];

const timeline = [
  {
    year: "2016",
    title: "Khởi nguồn AmazingTour",
    detail:
      "Một nhóm đam mê du lịch cùng nhau xây dựng nền tảng kết nối tour chất lượng với khách hàng Việt.",
  },
  {
    year: "2019",
    title: "Mở rộng mạng lưới",
    detail:
      "Phát triển đội ngũ đối tác nước ngoài và ra mắt những hành trình khám phá Á - Âu đặc sắc.",
  },
  {
    year: "2023",
    title: "Du lịch thông minh",
    detail:
      "Tích hợp AI gợi ý hành trình tự động, đồng thời mở rộng hệ sinh thái tour vì cộng đồng.",
  },
];

const commitments = [
  {
    title: "Cam kết minh bạch",
    body: "Chi phí rõ ràng, chính sách hủy linh hoạt và đội ngũ hỗ trợ luôn túc trực 24/7.",
  },
  {
    title: "Du lịch có trách nhiệm",
    body: "Hợp tác cùng địa phương để thúc đẩy văn hóa bản địa, giảm tải điểm nóng và hạn chế rác thải.",
  },
];

export default function About() {
  return (
    <div className="font-sans bg-slate-50 min-h-screen">
      <TopBar />
      <Header />
      <main className="pt-16 pb-12">
        <section className="relative bg-gradient-to-br from-[#0f172a] via-[#13304a] to-[#0b1f2f] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.3),_transparent_70%)]" />
          <div className="relative max-w-5xl mx-auto px-6 py-20 space-y-6">
            <p className="text-xs tracking-[0.6em] uppercase text-cyan-300">
              Giới thiệu
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              AmazingTour – người bạn đồng hành mở ra chân trời mới
            </h1>
            <p className="text-lg text-slate-200 max-w-3xl">
              Hơn cả một công ty du lịch, chúng tôi xây dựng hành trình mang
              tính gắn kết, bền vững và đầy cảm hứng cho cộng đồng người Việt.
              Mỗi tour đều được thiết kế tỉ mỉ dựa trên hiểu biết sâu sắc về
              điểm đến, con người và văn hóa địa phương.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 border border-white/20 rounded-xl px-5 py-4"
                >
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-slate-200">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-orange-400 hover:bg-orange-500 px-6 py-3 rounded-full font-semibold text-black shadow-lg transition"
              >
                <FaCompass /> Gặp chuyên viên
              </Link>
              <Link
                to="/recommend/phase1"
                className="inline-flex items-center gap-2 border border-white/40 px-6 py-3 rounded-full font-semibold text-white hover:bg-white/10 transition"
              >
                Tìm tour phù hợp
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 space-y-10">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
              Giá trị cốt lõi
            </p>
            <h2 className="text-3xl font-semibold text-slate-900">
              Hành động dựa trên tận tâm và sự tin tưởng
            </h2>
            <p className="text-slate-600 max-w-4xl">
              Từ hành trình ngắn ngày đến tour khám phá nhiều quốc gia,
              AmazingTour luôn đặt khách hàng làm trung tâm, đồng thời giữ vững
              cam kết minh bạch, trách nhiệm xã hội và đổi mới công nghệ.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 flex gap-4"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-slate-100 rounded-2xl">
                  {value.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {value.title}
                  </h3>
                  <p className="text-sm text-slate-500">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-6 py-16 space-y-8">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
                Hành trình phát triển
              </p>
              <h2 className="text-3xl font-semibold text-slate-900">
                Mỗi năm là một mốc son mới
              </h2>
            </div>
            <div className="space-y-6">
              {timeline.map((event) => (
                <article
                  key={event.year}
                  className="border-l-2 border-cyan-400 pl-6 py-4"
                >
                  <p className="text-xs uppercase tracking-[0.4em] text-cyan-500">
                    {event.year}
                  </p>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {event.title}
                  </h3>
                  <p className="text-slate-600">{event.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 grid gap-8 md:grid-cols-2">
          {commitments.map((item) => (
            <div
              key={item.title}
              className="bg-gradient-to-r from-[#e0f2fe] to-white rounded-3xl p-8 border border-slate-200 shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="text-slate-600 mt-3">{item.body}</p>
            </div>
          ))}
        </section>

        <section className="bg-[#062a38] text-white py-16 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <p className="text-sm tracking-[0.4em] uppercase text-cyan-300">
              Cùng hành trình
            </p>
            <h2 className="text-3xl font-semibold">
              Chúng tôi luôn sẵn sàng kể câu chuyện du lịch tiếp theo của bạn
            </h2>
            <p className="text-slate-200">
              Hãy trao cho chúng tôi ý tưởng, AmazingTour sẽ biến nó thành hành
              trình đáng nhớ cho cả nhà.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-10 py-3 rounded-full bg-orange-400 text-black font-semibold shadow-lg hover:bg-orange-500 transition"
            >
              Đặt lịch tư vấn
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

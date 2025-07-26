import { useParams, useNavigate } from "react-router-dom";
import placesData from "../data/places";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const place = placesData.find((p) => p.id === parseInt(id));

  if (!place) return <div className="p-8">Không tìm thấy địa điểm.</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Quay về trang chủ
      </button>

      <img
        src={place.image}
        alt={place.title}
        className="w-full h-96 object-cover rounded-xl mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{place.title}</h1>
      <p className="text-gray-600">{place.location}</p>
      <p className="text-xl text-blue-600 font-semibold mt-2 mb-4">
        ${place.price}
      </p>
      <p className="mb-8">{place.description}</p>

      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
        Đặt ngay
      </button>
    </div>
  );
}

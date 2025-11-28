import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import placesData from "../data/places";

function PlaceCard({ place }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={place.image}
          alt={place.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-lg text-sm font-semibold">
          <span className="flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            {place.rating}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
            {place.title}
          </h3>
          <span className="text-sm text-gray-500">
            {place.reviews} đánh giá
          </span>
        </div>

        <div className="flex items-center gap-1 mt-2 text-gray-600">
          <FaMapMarkerAlt className="text-gray-400" />
          <span className="text-sm">{place.location}</span>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex flex-wrap gap-2">
            {place.highlights.slice(0, 3).map((highlight, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full"
              >
                {highlight}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">
            {place.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-blue-600">
            <span className="text-sm">Chỉ từ</span>
            <div className="font-bold">{formatPrice(place.price)}</div>
          </div>

          <Link
            to={`/place/${place.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
}

function DestinationSection({ title, places }) {
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <Link
          to="/all-destinations"
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
}

function Places({ searchData }) {
  const filterPlaces = (places) => {
    if (!searchData) return places;
    return places.filter((place) => {
      const matchDestination = place.title
        .toLowerCase()
        .includes(searchData.destination.toLowerCase());
      const matchPrice = place.price <= searchData.price;
      return matchDestination && matchPrice;
    });
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Địa điểm đáng ghé thăm
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Khám phá những địa điểm đáng ghé thăm, từ bãi biển đẹp đến thành phố
          sôi động, được tuyển chọn cẩn thận cho chuyến du lịch của bạn.
        </p>
      </div>

      <DestinationSection
        title="Địa điểm trong nước"
        places={filterPlaces(placesData.domestic)}
      />

      <DestinationSection
        title="Địa điểm quốc tế"
        places={filterPlaces(placesData.international)}
      />
    </div>
  );
}

export default Places;
export { PlaceCard, DestinationSection };

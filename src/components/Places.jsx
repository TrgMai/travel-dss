import { Link } from "react-router-dom";
import placesData from "../data/places";

function Places({ searchData }) {
  const filtered = placesData.filter((place) => {
    if (!searchData) return true;
    const matchDestination = place.title
      .toLowerCase()
      .includes(searchData.destination.toLowerCase());
    const matchPrice = place.price <= searchData.price;
    return matchDestination && matchPrice;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {filtered.map((place) => (
        <div key={place.id} className="bg-white rounded-lg shadow">
          <img
            src={place.image}
            alt={place.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">{place.title}</h3>
            <p className="text-sm text-gray-600">{place.location}</p>
            <p className="mt-2 text-blue-600 font-semibold">${place.price}</p>
            <Link
              to={`/place/${place.id}`}
              className="mt-3 inline-block text-sm text-blue-500 hover:underline"
            >
              Xem chi tiết →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Places;

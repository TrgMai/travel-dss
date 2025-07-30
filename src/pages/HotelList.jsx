import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import TopBar from '../components/TopBar';
import FilterHotel from '../components/FilterHotel';
// Import tất cả dữ liệu khách sạn
import { dalat } from '../data/hotels/dalat.js';
import { danang } from '../data/hotels/danang.js';
import { nhatrang } from '../data/hotels/nhatrang.js';
import { phanthiet } from '../data/hotels/phanthiet.js';
import { phuquoc } from '../data/hotels/phuquoc.js';
import { phuyen } from '../data/hotels/phuyen.js';
import { quynhon } from '../data/hotels/quynhon.js';
import { vungtau } from '../data/hotels/vungtau.js';


export default function HotelList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const destination = searchParams.get('destination');

  // Import dữ liệu khách sạn
  // Map dữ liệu khách sạn
  const hotelData = {
    'dalat': dalat,
    'da-lat': dalat,
    'danang': danang,
    'da-nang': danang,
    'nhatrang': nhatrang,
    'nha-trang': nhatrang,
    'phanthiet': phanthiet,
    'phan-thiet': phanthiet,
    'phuquoc': phuquoc,
    'phu-quoc': phuquoc,
    'phuyen': phuyen,
    'phu-yen': phuyen,
    'quynhon': quynhon,
    'quy-nhon': quynhon,
    'vungtau': vungtau,
    'vung-tau': vungtau
  };

  // Lấy dữ liệu khách sạn dựa trên destination
  const hotels = destination ? hotelData[destination.toLowerCase()] || [] : [];

  return (
    <>
    <TopBar/>
    <div className="min-h-screen bg-gray-100 py-8">
     
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Search Results Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h1 className="text-xl font-semibold text-gray-800">
            {hotels.length} nơi lưu trú được tìm thấy tại {destination}
          </h1>
        </div>
        
        <div className="flex gap-4">
            <FilterHotel/>

          {/* Hotel List */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <select className="border rounded px-3 py-1">
                    <option>Độ phổ biến</option>
                    <option>Giá thấp nhất</option>
                    <option>Đánh giá cao nhất</option>
                  </select>
                  <select className="border rounded px-3 py-1">
                    <option>Mỗi phòng mỗi đêm</option>
                    <option>Tổng giá</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Xem:</span>
                  <button className="p-2 bg-gray-100 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 4h16v4H2V4zm0 6h16v4H2v-4z"/>
                    </svg>
                  </button>
                  <button className="p-2 bg-blue-50 text-blue-600 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 4h4v4H2V4zm6 0h4v4H8V4zm6 0h4v4h-4V4zM2 10h4v4H2v-4zm6 0h4v4H8v-4zm6 0h4v4h-4v-4z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {hotels.map((hotel) => (
                <div key={hotel.name} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Hotel Image */}
                <div className="md:w-1/3 h-64 relative">
                  <img
                    src={`/place/${destination}.jpg`}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.src = '/placeholder.jpg'}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                    <span className="text-white text-sm bg-blue-500 px-2 py-1 rounded">Gần biển</span>
                  </div>
                </div>

                {/* Hotel Info */}
                <div className="flex-1 p-6">
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h2 className="text-xl font-semibold text-gray-800">{hotel.name}</h2>
                        <div className="flex items-center space-x-1">
                          {[1,2,3,4,5].map((star) => (
                            <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                          ))}
                        </div>
                      </div>

                      <div className="mt-2 flex items-center text-gray-600">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{hotel.location}</span>
                      </div>

                      <div className="mt-4 flex items-center space-x-4">
                        <div className="flex items-center">
                          <div className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-semibold">
                            {hotel.rating}
                          </div>
                          <span className="ml-2 text-sm font-medium">
                            {parseFloat(hotel.rating) >= 9 ? 'Xuất sắc' : 'Rất tốt'}
                          </span>
                          <span className="ml-1 text-sm text-gray-500">
                            ({hotel.reviews} đánh giá)
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Wifi miễn phí</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Hồ bơi</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Bãi đậu xe</span>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end justify-between">
                      {hotel.price && hotel.price !== "Hết phòng" ? (
                        <>
                          <div>
                            <div className="text-sm text-gray-500 line-through">
                              {(parseInt(hotel.price) * 1.2).toLocaleString('vi-VN')} VND
                            </div>
                            <div className="text-2xl font-bold text-blue-600">
                              {parseInt(hotel.price).toLocaleString('vi-VN')} VND
                            </div>
                            <div className="text-xs text-gray-500">mỗi đêm</div>
                          </div>
                          <div className="mt-4">
                            <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded mb-2 inline-block">
                              Giảm 20%
                            </span>
                            <a 
                              href={hotel.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded transition duration-200 inline-block text-sm font-medium"
                            >
                              Đặt phòng
                            </a>
                          </div>
                        </>
                      ) : (
                        <div className="text-xl font-bold text-red-600">
                          Hết phòng
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
          </div>
        </div>
      </div>
    </>
  );
}
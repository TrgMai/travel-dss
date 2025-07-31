import { useState, useEffect } from 'react';
import { hotelAPI } from '../services/api';

export const useHotels = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getHotels = async (name) => {
    try {
      setLoading(true);
      setError(null);
      
      const [destinationHotels, nameHotels] = await Promise.all([
        hotelAPI.getHotelsByDestination(name),
        hotelAPI.getHotelByName(name)
      ]);

      return {
        byDestination: destinationHotels,
        byName: nameHotels
      };
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi tải danh sách khách sạn');
    } finally {
      setLoading(false);
    }
  };
  
  return {
    loading,
    error,
    getHotels,
    refetch: getHotels,
  };
};
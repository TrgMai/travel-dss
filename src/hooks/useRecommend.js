import { useState } from 'react';
import { tourAPI } from '../services/api';

export const useRecommend = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [hotTours, setHotTours] = useState(null);

  const getHotTours = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await tourAPI.getHotTour();
      setHotTours(result.tours);
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi lấy tour hot');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getRecommendations = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const result = await tourAPI.postRecommend(data);
      setRecommendations(result); 
      return result;  

    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi tạo gợi ý tour');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const buildSchedule = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const result = await tourAPI.postBuildSchedule(data);
      return result;
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi tạo lịch trình');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    recommendations,
    getRecommendations,
    buildSchedule,
    getHotTours,
    hotTours,
  };
};
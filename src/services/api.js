import axios from '../configs/axios';


export const hotelAPI = {
  getHotelsByDestination: async (destination) => {
    const response = await axios.post(
      `/hotels/by-location`,
      { location: destination },
    );
    return response.data;
  },

  getHotelByName: async (name) => {
    const response = await axios.post(
      `/hotels/by-name`,
      { name: name },
    );
    return response.data;
  },
};

export const tourAPI = {
  getHotTour: () => {
    return axios.get('/tours/hot');
  },
  postRecommend: (data) => {
    return axios.post('/recommend', data).then(res => res.data);
  },
  postBuildSchedule: (data) => {
    return axios.post('/build_schedule', data).then(res => res.data);
  },
};
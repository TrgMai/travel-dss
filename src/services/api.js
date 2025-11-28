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

export const authAPI = {
  login: async (credentials) => {
    // Simulate API call - replace with actual API endpoint
    // For now, we'll create a mock response
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock authentication - replace with actual API call
        if (credentials.email && credentials.password) {
          resolve({
            user: {
              id: "1",
              fullName: "Nguyễn Văn A",
              email: credentials.email,
              phone: "0123456789",
            },
            token: "mock_jwt_token_" + Date.now(),
          });
        } else {
          reject({ response: { data: { message: "Email và mật khẩu không được để trống" } } });
        }
      }, 500);
    });
    
    // Uncomment when backend is ready:
    // const response = await axios.post('/auth/login', credentials);
    // return response.data;
  },
  
  register: async (userData) => {
    // Simulate API call - replace with actual API endpoint
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock registration - replace with actual API call
        if (userData.email && userData.password && userData.fullName) {
          resolve({
            user: {
              id: Date.now().toString(),
              fullName: userData.fullName,
              email: userData.email,
              phone: userData.phone || "",
            },
            token: "mock_jwt_token_" + Date.now(),
          });
        } else {
          reject({ response: { data: { message: "Vui lòng điền đầy đủ thông tin" } } });
        }
      }, 500);
    });
    
    // Uncomment when backend is ready:
    // const response = await axios.post('/auth/register', userData);
    // return response.data;
  },
};
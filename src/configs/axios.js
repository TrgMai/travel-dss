import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           break;
//         case 403:
//           break;
//         case 404:
//           break;
//         default:
//           break;
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
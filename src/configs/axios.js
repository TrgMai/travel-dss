import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Có thể thêm token vào header ở đây nếu cần
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     // Xử lý các lỗi response ở đây
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           // Xử lý lỗi unauthorized
//           break;
//         case 403:
//           // Xử lý lỗi forbidden
//           break;
//         case 404:
//           // Xử lý lỗi not found
//           break;
//         default:
//           // Xử lý các lỗi khác
//           break;
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
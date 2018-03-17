import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/apiv1',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    // ContentType: 'application/json',
    // Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (localStorage.getItem('token') && config.headers.Authorization === 'null') {
    config.headers.Authorization = `Bearer +${localStorage.getItem('access_token')}`;
  }
  return config;
});

export default axiosInstance;

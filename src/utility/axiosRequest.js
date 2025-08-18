import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_API_URL = import.meta.env.VITE_API_URL;

export const apiRequest = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true, // always send cookies
});

apiRequest.interceptors.request.use((config) => {
  const token = Cookies.get('shopinz');
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

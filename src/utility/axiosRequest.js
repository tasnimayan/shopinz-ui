import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_API_URL;

export const apiRequest = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true, // always send cookies
});

import { create } from 'zustand';
import axios from 'axios';
import { unauthorized } from '../utility/Utility.js';
import Cookies from 'js-cookie';

export const SellerStore = create((set) => ({
  isFormSubmit: false,

  isLogin: () => {
    return !!Cookies.get('seller');
  },

  SellerLoginData: { email: '', password: '' },
  LoginFormOnChange: (name, value) => {
    set((state) => ({
      SellerLoginData: {
        ...state.SellerLoginData,
        [name]: value,
      },
    }));
  },

  SellerLoginRequest: async (formData) => {
    set({ isFormSubmit: true });
    let res = await axios.post(`/api/v1/seller/login`, formData);
    set({ isFormSubmit: false });
    return res.data['status'] === 'success';
  },

  SellerLogoutRequest: async () => {
    set({ isFormSubmit: true });
    let res = await axios.get(`/api/v1/seller/logout`);
    set({ isFormSubmit: false });
    return res.data['status'] === 'success';
  },

  productData: {
    title: '',
    des: '',
    photos: [],
    price: '',
    discount: false,
    discountPrice: '',
    categoryID: '',
    brandID: '',
    tags: '',
    size: '',
    color: '',
    stock: 1,
    sku: '',
  },
  productDataOnChange: (name, value) => {
    set((state) => ({
      productData: {
        ...state.productData,
        [name]: value,
      },
    }));
  },

  CreateProductRequest: async (PostBody) => {
    try {
      set({ productData: null });
      let res = await axios.post(`/api/v1/seller/products`, PostBody);
      return res.data['status'] === 'success';
    } catch (e) {
      unauthorized(e.response.status);
    }
  },

  ProductDeleteRequest: async (id) => {
    try {
      set({ productData: null });
      let res = await axios.delete(`/api/v1/seller/products/${id}`);
      return res.data['status'] === 'success';
    } catch (e) {
      unauthorized(e.response.status);
    }
  },

  SellerProducts: [],
  SellerProductsRequest: async () => {
    try {
      let res = await axios.get(`/api/v1/seller/products`);
      if (res.data['data']) {
        set({ SellerProducts: res.data['data'] });
      } else {
        set({ SellerProducts: [] });
      }
    } catch (e) {
      unauthorized(e.response.status);
    }
  },

  SearchProductRequest: async (query) => {
    try {
      let res = await axios.get(`/api/v1/seller/search/${query}`);
      if (res.data['data']) {
        set({ SellerProducts: res.data['data'] });
      } else {
        set({ SellerProducts: [] });
      }
    } catch (e) {
      unauthorized(e.response.status);
    }
  },

  RegFormData: { storeName: '', phone: '', email: '', password: '' },
  RegFormOnChange: (name, value) => {
    set((state) => ({
      RegFormData: {
        ...state.RegFormData,
        [name]: value,
      },
    }));
  },

  SellerRegRequest: async (formData) => {
    set({ isFormSubmit: true });
    let res = await axios.post(`/api/v1/seller/signup`, formData);
    set({ isFormSubmit: false });
    return res.data['status'] === 'success';
  },
}));

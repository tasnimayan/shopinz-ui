import { create } from 'zustand';
import axios from 'axios';

const ProductStore = create((set) => ({
  BrandList: null,
  BrandListRequest: async () => {
    let res = await axios.get(`/api/v1/products/brands`);
    if (res.data['status'] === 'success') {
      set({ BrandList: res.data['data'] });
    }
  },

  CategoryList: null,
  CategoryListRequest: async () => {
    let res = await axios.get(`/api/v1/products/category`);
    if (res.data['status'] === 'success') {
      set({ CategoryList: res.data['data'] });
    }
  },

  SliderList: null,
  SliderListRequest: async () => {
    let res = await axios.get(`/api/v1/products/slider`);
    if (res.data['status'] === 'success') {
      set({ SliderList: res.data['data'] });
    }
  },

  ListByRemark: null,
  ListByRemarkRequest: async (remark) => {
    set({ ListByRemark: null });
    let res = await axios.get(`/api/v1/products/remark/${remark}`);
    if (res.data['status'] === 'success') {
      set({ ListByRemark: res.data['data'] });
    }
  },

  ListByRating: null,
  ListByRatingRequest: async () => {
    try {
      set({ ListByRating: null });
      let res = await axios.get(`/api/v1/products/top-rated`);
      if (res.data['status'] === 'success') {
        set({ ListByRating: res.data['data'] });
      }
    } catch (error) {
      console.log(error);
    }
  },

  productList: null,
  isProductLoading: false,
  productError: false,
  ListByBrandRequest: async (BrandID) => {
    set({ isProductLoading: true, productList: null, productError: false });
    try {
      let res = await axios.get(`/api/v1/products/brands/${BrandID}`);
      if (res.data['status'] === 'success') {
        set({ productList: res.data['data'] });
      }
    } catch (error) {
      set({ productError: true });
    } finally {
      set({ isProductLoading: false });
    }
  },
  ListByFilterRequest: async (filters) => {
    set({ isProductLoading: true, productList: null, productError: false });
    try {
      const filteredFilters = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value));
      const queryParams = new URLSearchParams(filteredFilters).toString();
      let res = await axios.get(`/api/v1/products?${queryParams}`);
      if (res.data['status'] === 'success') {
        set({ productList: res.data['data'] });
      }
    } catch (error) {
      set({ productError: true });
    } finally {
      set({ isProductLoading: false });
    }
  },

  Details: null,
  isLoadingDetails: false,
  DetailsRequest: async (id) => {
    try {
      set({ isLoadingDetails: true });
      let res = await axios.get(`/api/v1/products/product/${id}`);
      if (res.data['status'] === 'success') {
        set({ Details: res.data['data'] });
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      // You might want to handle the error state here as well
    } finally {
      set({ isLoadingDetails: false });
    }
  },

  ReviewList: null,
  ReviewListRequest: async (id) => {
    let res = await axios.get(`/api/v1/products/${id}/review`);
    if (res.data['status'] === 'success') {
      set({ ReviewList: res.data['data'] });
    }
  },
}));

export default ProductStore;

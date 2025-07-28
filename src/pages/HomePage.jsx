import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout.jsx';
import Brands from '../components/product/Brands.jsx';
import ProductStore from '../store/productStore.js';
import FeatureStore from '../store/featureStore.js';
import Slider from '../components/product/Slider.jsx';
import Categories from '../components/product/Categories.jsx';
import Products from '../components/product/Products.jsx';
import TopRatedCarousel from '../components/product/TopRatedCarousel.jsx';
import Subscribe from './../components/subscribe/Subscribe';
import TrendingSlider from '../components/product/TrendingSlider.jsx';
import CouponCard from '../components/product/CouponCard.jsx';
import OfferSlider from '../components/product/OfferSlider.jsx';
import { Features } from '../components/features/Feature.jsx';

const HomePage = () => {
  const { BrandListRequest, CategoryListRequest, SliderListRequest, ListByRemarkRequest } = ProductStore();
  const { FeatureListRequest } = FeatureStore();

  useEffect(() => {
    (async () => {
      await SliderListRequest();
      await FeatureListRequest();
      await CategoryListRequest();
      await ListByRemarkRequest('new');
      await BrandListRequest();
    })();
  }, []);

  return (
    <Layout>
      <Slider />
      <Features />
      <TrendingSlider />
      <Categories />
      <CouponCard />
      <Products />
      <OfferSlider />
      <Brands />
      <TopRatedCarousel />
      <Subscribe />
    </Layout>
  );
};

export default HomePage;

import { useEffect } from 'react';
import Layout from '../components/layout/RootLayout.jsx';
import { BrandList } from '../components/product/BrandList.jsx';
import ProductStore from '../store/ProductStore.js';
import FeatureStore from '../store/FeatureStore.js';
import { HeroSlider } from '../components/product/HeroSlider.jsx';
import { CategoryList } from '../components/product/CategoryList.jsx';
import { ProductsTab } from '../components/product/ProductsTab.jsx';
import { TopRatedCarousel } from '../components/product/TopRatedCarousel.jsx';
import { Subscribe } from '../components/subscribe/Subscribe';
import { TrendingSlider } from '../components/product/TrendingSlider.jsx';
import { CouponCard } from '../components/product/CouponCard.jsx';
import { OffersSlider } from '../components/product/OffersSlider.jsx';
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
  }, [SliderListRequest, FeatureListRequest, CategoryListRequest, ListByRemarkRequest, BrandListRequest]);

  return (
    <Layout>
      <HeroSlider />
      <Features />
      <TrendingSlider />
      <CategoryList />
      <CouponCard />
      <ProductsTab />
      <OffersSlider />
      <BrandList />
      <TopRatedCarousel />
      <Subscribe />
    </Layout>
  );
};

export default HomePage;

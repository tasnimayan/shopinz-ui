import { useParams } from 'react-router-dom';
import ProductStore from '../store/ProductStore.js';
import { useEffect } from 'react';
import { ProductDetails } from '../components/product/ProductDetails.jsx';
import Layout from '../components/layout/RootLayout.jsx';
import Brands from '../components/product/Brands.jsx';

export default function ProductDetailsPage() {
  const { BrandList, DetailsRequest, ReviewListRequest, BrandListRequest } = ProductStore();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await DetailsRequest(id);
      await ReviewListRequest(id);
      BrandList === null ? await BrandListRequest() : null;
    })();
  }, [id, DetailsRequest, ReviewListRequest, BrandListRequest, BrandList]);

  return (
    <Layout>
      <div className="container mt-2">
        <ProductDetails />
        <Brands />
      </div>
    </Layout>
  );
}

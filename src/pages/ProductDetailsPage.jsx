import { useParams } from 'react-router-dom';
import ProductStore from '../store/ProductStore.js';
import { useEffect } from 'react';
import { ProductDetails } from '../components/product/ProductDetails.jsx';
import Layout from '../components/layout/RootLayout.jsx';
import { BrandList } from '../components/product/BrandList.jsx';

export default function ProductDetailsPage() {
  const { BrandList: brands, DetailsRequest, ReviewListRequest, BrandListRequest } = ProductStore();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await DetailsRequest(id);
      await ReviewListRequest(id);
      brands === null ? await BrandListRequest() : null;
    })();
  }, [id, DetailsRequest, ReviewListRequest, BrandListRequest, brands]);

  return (
    <Layout>
      <div className="container mt-2">
        <ProductDetails />
        <BrandList />
      </div>
    </Layout>
  );
}

import { useEffect } from 'react';
import ProductStore from '../store/ProductStore.js';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/RootLayout.jsx';
import ProductList from '../components/product/ProductList.jsx';

export default function ProductByBrand() {
  const { ListByBrandRequest } = ProductStore();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await ListByBrandRequest(id);
    })();
  }, [id, ListByBrandRequest]);

  return (
    <Layout>
      <ProductList />
    </Layout>
  );
}

import React, { useEffect } from 'react';
import ProductStore from '../store/productStore.js';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/RootLayout.jsx';
import ProductList from '../components/product/ProductList.jsx';

const ProductByBrand = () => {
  const { ListByBrandRequest } = ProductStore();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await ListByBrandRequest(id);
    })();
  }, [id]);

  return (
    <Layout>
      <ProductList />
    </Layout>
  );
};

export default ProductByBrand;

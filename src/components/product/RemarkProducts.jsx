import React from 'react';
import { useParams } from 'react-router-dom';
import ProductsPage from '../../pages/ProductsPage';

const RemarkProducts = () => {
  const { remark } = useParams();
  return <ProductsPage key={remark} remarkType={remark} />;
};

export default RemarkProducts;

import React from 'react';
import { useParams } from 'react-router-dom';
import ProductsPage from '../../pages/ProductsPage';

const RemarkProducts = () => {
  const { remark } = useParams();

  return <ProductsPage categoryId={null} remarkType={remark} />;
};

export default RemarkProducts;

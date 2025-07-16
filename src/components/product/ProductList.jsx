import React from 'react';
import ProductStore from '../../store/ProductStore.js';
import ProductsSkeleton from '../../skeleton/products-skeleton.jsx';
import ProductCard from './ProductCard.jsx';

const ProductList = () => {
  const { productList, isProductLoading, productError } = ProductStore();

  if (isProductLoading) {
    return <ProductsSkeleton />;
  }
  if (productError) {
    return <div>Error fetching products</div>;
  }
  if (!productList?.products?.length) {
    return <div>No products found</div>;
  }
  const { total, page, totalPages, products } = productList;

  return (
    <div className="row">
      {products?.map((product) => (
        <ProductCard
          key={`${product._id}-${product.sku}`}
          product={product}
          className="product-card col-md-4 p-2 col-lg-3 col-6"
        />
      ))}
    </div>
  );
};

export default React.memo(ProductList);

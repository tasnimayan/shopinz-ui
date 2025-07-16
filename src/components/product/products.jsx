import React from 'react';
import ProductStore from '../../store/ProductStore.js';
import ProductsSkeleton from '../../skeleton/products-skeleton.jsx';
import ProductCard from './ProductCard.jsx';
import SectionHeadline from './SectionHeadline.jsx';
import { useState } from 'react';
import { useEffect } from 'react';

const TAB_CONFIG = [
  { label: 'All Products', key: 'new' },
  { label: 'Trending', key: 'trending' },
  { label: 'Popular', key: 'popular' },
  { label: 'Top', key: 'top' },
  { label: 'Special', key: 'special' },
];

const Products = () => {
  const { ListByRemark, ListByRemarkRequest } = ProductStore();
  const [activeTab, setActiveTab] = useState('new');

  useEffect(() => {
    ListByRemarkRequest(activeTab);
  }, [activeTab, ListByRemarkRequest]);

  return (
    <div className="py-5 bg-white">
      <div className="container">
        <SectionHeadline text="our products">
          <ul className="nav nav-tabs justify-content-center border-0 fs-md fw-normal float-end">
            {TAB_CONFIG.map((tab) => (
              <li className="nav-item" key={tab.key}>
                <button
                  className={`nav-link ${activeTab === tab.key ? 'active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </SectionHeadline>

        <div className="tab-content" id="pills-tabContent">
          {ListByRemark === null ? (
            <ProductsSkeleton />
          ) : (
            <div className="container">
              <div className="row">
                {ListByRemark.map((product) => (
                  <ProductCard
                    product={product}
                    key={product._id || product.id}
                    className="product-card col-md-3 p-2 col-lg-2 col-6"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

import React, { useEffect, useState } from 'react';
import ProductStore from '../store/ProductStore.js';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/layout/layout.jsx';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import ProductList from '../components/product/ProductList.jsx';

// Constants
const PRICE_RANGE = {
  MIN: 0,
  MAX: 100000,
  STEP: 1000,
};

const FilterSection = ({ title, value, onChange, children, ...rest }) => (
  <div className="mb-3">
    <label className="form-label">{title}</label>
    <select value={value} onChange={onChange} className="form-control form-select" aria-label={title} {...rest}>
      {children}
    </select>
  </div>
);

FilterSection.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const PriceRangeInput = ({ label, value, onChange, ...rest }) => (
  <div className="mb-3">
    <label className="form-label">
      {label} ${value || 0}
    </label>
    <input
      type="range"
      className="form-range"
      value={value || ''}
      onChange={onChange}
      min={PRICE_RANGE.MIN}
      max={PRICE_RANGE.MAX}
      step={PRICE_RANGE.STEP}
      aria-label={label}
      {...rest}
    />
  </div>
);

PriceRangeInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

const ProductsPage = ({ categoryId, remarkType }) => {
  const { BrandListRequest, BrandList, CategoryList, CategoryListRequest, ListByFilterRequest } = ProductStore();

  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState({
    brandId: '',
    categoryId: categoryId,
    maxPrice: '',
    minPrice: '',
  });

  const search = searchParams.get('search');
  const brand = searchParams.get('brand');
  const category = searchParams.get('category');
  const remark = searchParams.get('remark');

  const fetchData = useCallback(async () => {
    try {
      await Promise.all([BrandList === null && BrandListRequest(), CategoryList === null && CategoryListRequest()]);

      await ListByFilterRequest({
        ...filter,
        search,
        brandId: brand,
        categoryId: category,
        remark: remarkType || remark,
      });
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  }, [filter, search, brand, category, remark, BrandList, CategoryList]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterChange = useCallback((name, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  }, []);

  const handlePriceChange = useCallback(
    (name, value) => {
      const numericValue = value === '' ? '' : Number(value);
      handleFilterChange(name, numericValue);
    },
    [handleFilterChange]
  );

  return (
    <Layout>
      <div className="container-fluid mt-2">
        <div className="row">
          <aside className="col-md-3 p-2">
            <div className="px-3">
              <div className="card vh-100 p-3 shadow-sm">
                <h2 className="h5 mb-3">Filters</h2>

                <FilterSection
                  title="Brands"
                  value={filter.brandId}
                  onChange={(e) => handleFilterChange('brandId', e.target.value)}
                >
                  <option value="" disabled>
                    Choose Brand
                  </option>
                  {BrandList?.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.brandName}
                    </option>
                  )) || <option>Loading brands...</option>}
                </FilterSection>

                <FilterSection
                  title="Categories"
                  value={filter.categoryId}
                  onChange={(e) => handleFilterChange('categoryId', e.target.value)}
                >
                  <option value="">All Categories</option>
                  {CategoryList?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.categoryName}
                    </option>
                  )) || <option>Loading categories...</option>}
                </FilterSection>

                <PriceRangeInput
                  label="Maximum Price"
                  value={filter.maxPrice}
                  onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                />

                <PriceRangeInput
                  label="Minimum Price"
                  value={filter.minPrice}
                  onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                />
              </div>
            </div>
          </aside>
          <main className="col-md-9 p-2">
            <ProductList />
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;

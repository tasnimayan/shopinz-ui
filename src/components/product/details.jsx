import ProductImages from './ProductImages.jsx';
import ProductStore from '../../store/ProductStore.js';
import DetailsSkeleton from '../../skeleton/details-skeleton.jsx';
import parse from 'html-react-parser';
import { useEffect, useState, useCallback } from 'react';
import Reviews from './Reviews.jsx';
import CartStore from '../../store/CartStore.js';
import WishStore from '../../store/WishStore.js';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const ProductData = ({ data }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const { CartForm, isCartSubmit, CartSaveRequest, CartListRequest } = CartStore();

  const { WishSaveRequest } = WishStore();

  const colors = data.details?.color ?? [];
  const sizes = data.details?.size ?? [];

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = useCallback(async () => {
    const updatedForm = { ...CartForm, productID: data._id };
    const res = await CartSaveRequest(updatedForm);
    if (res) {
      toast.success('Added to cart');
      await CartListRequest();
    }
  }, [CartForm, CartSaveRequest, CartListRequest, data]);

  const handleAddToWish = useCallback(async () => {
    const payload = { productId: data._id, qty: '1' };
    const res = await WishSaveRequest(payload);
    if (res) toast.success('Added to wishlist');
  }, [WishSaveRequest, data]);

  return (
    <div className="p-4">
      {/* Brand */}
      <div className="d-flex align-items-center mb-2">
        <img
          src={data.brand.brandImg || '/placeholder.svg'}
          alt={data.brand.brandName}
          style={{ width: '30px', height: '30px', objectFit: 'contain' }}
          className="me-1"
        />
        <span className="text-muted">{data.brand.brandName}</span>
      </div>

      {/* Title */}
      <h1 className="h2 mb-2">{data.title}</h1>

      <div className="d-flex align-items-center justify-content-between mb-2">
        <span className="me-4 h6">
          <i className="bi bi-fire text-danger" aria-hidden="true" /> 0 sold. Only {data.stock} remain
        </span>
        <div className="d-flex align-items-center gap-2">
          <StarRatings
            rating={parseFloat(data.rating || 0)}
            starRatedColor="gold"
            starDimension="18px"
            starSpacing="1px"
          />
          <span className="text-muted">({data.rating})</span>

          <span className="text-muted">0 reviews</span>
        </div>
      </div>

      {/* Price */}
      <div className="mb-2">
        {data.discount ? (
          <div>
            <span className="h3 text-danger me-3">${data.discountPrice}</span>
            <span className="h5 text-muted text-decoration-line-through">${data.price}</span>
            <span className="badge bg-danger ms-2">
              {Math.round(
                ((Number.parseFloat(data.price) - Number.parseFloat(data.discountPrice)) /
                  Number.parseFloat(data.price)) *
                  100
              )}
              % OFF
            </span>
          </div>
        ) : (
          <span className="h3 text-primary">${data.price}</span>
        )}
      </div>

      {/* Stock Status */}
      <div className="mb-2">
        {data.stock > 0 ? (
          <span className="badge bg-success">
            <i className="fas fa-check me-1"></i>
            {data.stock} in stock
          </span>
        ) : (
          <span className="badge bg-danger">
            <i className="fas fa-times me-1"></i>
            Out of stock
          </span>
        )}
      </div>

      {data.sku && <p className="text-muted mb-2">SKU: {data.sku}</p>}

      {/* Color Selection */}
      {colors.length > 0 && (
        <div className="mb-2">
          <label className="form-label fw-bold">Color:</label>
          <div className="d-flex gap-2 flex-wrap">
            {colors.map((color) => (
              <button
                key={color}
                className={`btn btn-outline-secondary ${selectedColor === color ? 'active' : ''}`}
                onClick={() => setSelectedColor(color)}
                style={{ textTransform: 'capitalize' }}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {sizes.length > 0 && (
        <div className="mb-2">
          <label className="form-label fw-bold">Size:</label>
          <div className="d-flex gap-2 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size}
                className={`btn btn-outline-secondary ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="mb-3">
        <label className="form-label fw-bold">Quantity:</label>
        <div className="input-group" style={{ width: '120px' }}>
          <button className="btn btn-outline-secondary" onClick={decrementQuantity}>
            -
          </button>
          <input
            type="number"
            className="form-control text-center"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
            min="1"
            max={data.stock}
            style={{ height: '2.5rem' }}
          />
          <button className="btn btn-outline-secondary" onClick={incrementQuantity}>
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex gap-3 mb-2">
        <button className="btn btn-primary btn-lg flex-fill" onClick={handleAddToCart} disabled={data.stock === 0}>
          <i className="fa fa-cart-shopping me-2"></i>
          {isCartSubmit ? 'Adding to cart...' : 'Add to Cart'}
        </button>
        <button className="btn btn-outline-danger btn-lg" onClick={handleAddToWish}>
          <i className="bi bi-heart"></i>
        </button>
      </div>

      {/* Tags */}
      <div className="mb-4">
        <label className="form-label fw-bold">Tags:</label>
        <div className="d-flex gap-2 flex-wrap">
          {data.details.tags.map((tag, index) => (
            <span key={index} className="badge bg-light text-dark">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Details = () => {
  const { id } = useParams();
  const { Details, DetailsRequest, isLoadingDetails } = ProductStore();

  useEffect(() => {
    const fetchDetails = async () => {
      window.scrollTo(0, 0);
      await DetailsRequest(id);
    };
    fetchDetails();
  }, [id, DetailsRequest]);

  if (isLoadingDetails) return <DetailsSkeleton />;
  if (!Details) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger" role="alert">
          No product found
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="row">
        <div className="col-md-6 p-3">
          <ProductImages images={Details.details.images} />
        </div>
        <div className="col-md-6 p-3">
          <ProductData data={Details} />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-9">
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <ul
                className="nav nav-tabs nav-fill border-bottom-0 px-3 pt-3"
                id="productTabs"
                role="tablist"
                style={{
                  '--bs-nav-tabs-border-width': '0',
                  '--bs-nav-tabs-link-hover-border-color': 'transparent',
                  '--bs-nav-tabs-link-active-bg': 'transparent',
                }}
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active fw-medium text-uppercase position-relative px-4 py-3"
                    id="description-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#description-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="description-tab-pane"
                    aria-selected="true"
                    style={{
                      color: '#333',
                      border: 'none',
                      borderBottom: '3px solid transparent',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <i className="bi bi-card-text me-2"></i>Description
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link fw-medium text-uppercase position-relative px-4 py-3"
                    id="review-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#review-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="review-tab-pane"
                    aria-selected="false"
                    style={{
                      color: '#6c757d',
                      border: 'none',
                      borderBottom: '3px solid transparent',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <i className="bi bi-chat-square-text me-2"></i>Reviews
                    <span className="badge bg-primary ms-2">{Details?.reviews?.length || 0}</span>
                  </button>
                </li>
              </ul>

              <div className="tab-content p-4" id="productTabsContent">
                <div
                  className="tab-pane fade show active"
                  id="description-tab-pane"
                  role="tabpanel"
                  aria-labelledby="description-tab"
                  tabIndex="0"
                >
                  <div className="p-3">{parse(Details?.details['des'] || '<p>No description available</p>')}</div>
                </div>
                <div
                  className="tab-pane fade"
                  id="review-tab-pane"
                  role="tabpanel"
                  aria-labelledby="review-tab"
                  tabIndex="0"
                >
                  <div className="p-3">
                    <Reviews productId={id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 mt-4 mt-lg-0">
          <div className="card shadow-sm h-100">
            <div className="card-body p-0">
              <div className="p-4 border-bottom">
                <h6 className="fw-bold mb-3">Product Highlights</h6>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Free Shipping
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Secure Payment
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    30-Day Returns
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    24/7 Support
                  </li>
                </ul>
              </div>
              <div className="p-4">
                <h6 className="fw-bold mb-3">Need Help?</h6>
                <p className="small text-muted mb-0">
                  Have questions about this product? Our customer service team is here to help.
                </p>
                <button className="btn btn-outline-primary btn-sm mt-3 w-100">Contact Us</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .nav-tabs .nav-link {
          margin-bottom: -1px;
          background: none;
          border: none;
          color: #6c757d;
          position: relative;
          overflow: hidden;
        }

        .nav-tabs .nav-link:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 3px;
          background-color: #0d6efd;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-tabs .nav-link:hover,
        .nav-tabs .nav-link.active {
          color: #0d6efd;
          background-color: rgba(13, 110, 253, 0.05);
          border: none;
        }

        .nav-tabs .nav-link.active:after {
          width: 100%;
        }

        .tab-content {
          background: #fff;
          border-radius: 0 0 0.5rem 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default Details;

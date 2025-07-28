import { useState, useCallback } from 'react';
import CartStore from '../../store/cartStore.js';
import WishStore from '../../store/wishStore.js';
import toast from 'react-hot-toast';
import StarRatings from 'react-star-ratings';
import '../../assets/css/product-details.style.css';

export const ProductData = ({ data }) => {
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

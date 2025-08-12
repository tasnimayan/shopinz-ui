import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const BASE_URL = import.meta.env.VITE_API_URL;

export const ProductCard = ({ product, className = '' }) => {
  const { _id, image, title, price, discount, discountPrice, rating = 0, stock } = product || {};

  const displayPrice = discount ? (
    <p className="bodySmall text-accent fs-6 my-0 fw-semibold">
      ${discountPrice} <span className="strike text-black-50 bodySmall fw-normal">${price}</span>
    </p>
  ) : (
    <p className="bodySmall text-accent fs-6 my-0 fw-semibold">${price}</p>
  );

  const imagePath = image ? BASE_URL + image : '/fallback-image.jpg';

  return (
    <div className={`product-card ${className}`}>
      <div className="card rounded-2 h-100 text-center bg-white shadow-sm border-0 position-relative hover-shadow transition">
        <Link to={`/products/${_id}`} className="text-decoration-none text-dark">
          <div className="position-relative overflow-hidden">
            <img
              src={imagePath}
              alt={title}
              onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
              className="w-100 img-md p-2 object-fit-cover rounded-4 overflow-hidden"
              style={{ height: '200px' }}
            />
            {discount && (
              <span className="badge bg-danger position-absolute top-0 start-0 m-2 rounded-pill">
                -{Math.round(((price - discountPrice) / price) * 100)}%
              </span>
            )}
            {stock <= 0 && <span className="badge bg-secondary position-absolute top-0 end-0 m-2">Out of Stock</span>}
          </div>
          <div className="px-3 py-2">
            <p className="bodySmall fw-semibold text-dark line-2 mb-1 " title={title}>
              {title}
            </p>
            <div className="d-flex justify-content-center align-items-center mb-1">
              <StarRatings rating={parseFloat(rating)} starRatedColor="gold" starDimension="14px" starSpacing="1px" />
              <span className="small text-muted ms-1">({rating})</span>
            </div>
            {displayPrice}
          </div>
        </Link>
      </div>
    </div>
  );
};

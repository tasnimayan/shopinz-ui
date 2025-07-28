import ProductImages from './ProductImages.jsx';
import ProductStore from '../../store/productStore.js';
import DetailsSkeleton from '../../skeleton/details-skeleton.jsx';
import parse from 'html-react-parser';
import { useEffect } from 'react';
import Reviews from './Reviews.jsx';
import { useParams } from 'react-router-dom';
import '../../assets/css/product-details.style.css';
import { ProductData } from './ProductData.jsx';

export const ProductDetails = () => {
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
    </div>
  );
};

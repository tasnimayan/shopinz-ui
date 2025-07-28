import ProductStore from '../../store/productStore.js';
import StarRatings from 'react-star-ratings';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-hot-toast';

const Reviews = ({ productId }) => {
  const { ReviewList, ReviewListRequest } = ProductStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);

  const [review, setReview] = useState({
    name: '',
    rating: 0,
    review: '',
    images: [],
  });

  const handleChange = (name, value) => {
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (newRating) => {
    setReview((prev) => ({ ...prev, rating: newRating }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Limit to 4 images
    if (files.length > 4) {
      toast.warning('You can upload up to 4 images');
      return;
    }

    // Check file types and sizes
    const validFiles = files.filter((file) => {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        toast.error(`Invalid file type: ${file.name}. Only JPG, PNG, GIF are allowed.`);
        return false;
      }

      if (file.size > maxSize) {
        toast.error(`File too large: ${file.name}. Max size is 5MB.`);
        return false;
      }

      return true;
    });

    // Create image previews
    const previews = validFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
    setReview((prev) => ({ ...prev, images: validFiles }));
  };

  const removeImage = (index) => {
    const newPreviews = [...imagePreviews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);

    const newImages = [...review.images];
    newImages.splice(index, 1);
    setReview((prev) => ({ ...prev, images: newImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!review.name.trim()) {
      return toast.error('Please enter your name');
    }

    if (review.rating === 0) {
      return toast.error('Please select a rating');
    }

    if (!review.review.trim()) {
      return toast.error('Please write your review');
    }

    setIsSubmitting(true);

    try {
      // Prepare form data if needed for file upload
      const formData = new FormData();
      formData.append('name', review.name);
      formData.append('rating', review.rating);
      formData.append('review', review.review);
      review.images.forEach((image, index) => {
        formData.append(`images`, image);
      });

      // Replace with your actual API call
      // const res = await SendReview(formData);
      const res = { success: true };

      if (res.success) {
        toast.success('Thank you for your review!');
        setReview({
          name: '',
          rating: 0,
          review: '',
          images: [],
        });
        setImagePreviews([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        await ReviewListRequest(productId);
      } else {
        throw new Error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(error.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    ReviewListRequest(productId);

    // Cleanup object URLs to avoid memory leaks
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [productId]);

  // Render star rating input
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(review.rating);
    const hasHalfStar = review.rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <i
            key={i}
            className="bi bi-star-fill text-warning"
            style={{ cursor: 'pointer', fontSize: '1.5rem' }}
            onClick={() => handleRatingChange(i)}
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <i
            key={i}
            className="bi bi-star-half text-warning"
            style={{ cursor: 'pointer', fontSize: '1.5rem' }}
            onClick={() => handleRatingChange(i - 0.5)}
          />
        );
      } else {
        stars.push(
          <i
            key={i}
            className="bi bi-star text-warning"
            style={{ cursor: 'pointer', fontSize: '1.5rem' }}
            onClick={() => handleRatingChange(i)}
          />
        );
      }
    }

    return stars;
  };

  return (
    <div className="mt-4">
      {/* Reviews List */}
      <div className="mb-5">
        <h4 className="mb-4">Customer Reviews</h4>
        {ReviewList && ReviewList.length > 0 ? (
          <div className="list-group">
            {ReviewList.map((item, idx) => (
              <div key={idx} className="list-group-item border-0 p-3 mb-3 shadow-sm rounded-3">
                <div className="d-flex align-items-center mb-2">
                  <div
                    className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: '40px', height: '40px' }}
                  >
                    <i className="bi bi-person fs-5 text-muted"></i>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-semibold">{item['profile']?.['cus_name'] || 'Anonymous'}</h6>
                    <div className="d-flex align-items-center mt-1">
                      <StarRatings
                        rating={parseFloat(item['rating'] || 0)}
                        starRatedColor="#ffc107"
                        starDimension="16px"
                        starSpacing="1px"
                        numberOfStars={5}
                        name="rating"
                      />
                      <span className="text-muted ms-2 small">{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <p className="mt-2 mb-0">{item['review']}</p>

                {item.images && item.images.length > 0 && (
                  <div className="d-flex gap-2 mt-3">
                    {item.images.map((img, imgIdx) => (
                      <img
                        key={imgIdx}
                        src={img}
                        alt="Review"
                        className="img-thumbnail"
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 bg-light rounded-3">
            <i className="bi bi-chat-square-text fs-1 text-muted mb-3 d-block"></i>
            <p className="text-muted mb-0">No reviews yet. Be the first to review!</p>
          </div>
        )}
      </div>

      {/* Review Form */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h4 className="mb-4">Write a Review</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="form-label fw-medium">
                Your Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="name"
                className="form-control form-control-lg"
                value={review.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-medium d-block mb-2">
                Your Rating <span className="text-danger">*</span>
              </label>
              <div className="d-flex align-items-center">
                <div className="me-3">{renderStars()}</div>
                <span className="ms-2 fw-medium">
                  {review.rating > 0 ? `${review.rating.toFixed(1)}/5` : 'Rate this product'}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="review" className="form-label fw-medium">
                Your Review <span className="text-danger">*</span>
              </label>
              <textarea
                id="review"
                rows="4"
                className="form-control"
                value={review.review}
                onChange={(e) => handleChange('review', e.target.value)}
                placeholder="Share your experience with this product"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="form-label fw-medium d-block">Add Photos (Optional)</label>
              <p className="text-muted small mb-2">
                Upload up to 4 photos to help others see what you're sharing. Max 5MB each.
              </p>

              <input
                type="file"
                ref={fileInputRef}
                className="d-none"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                disabled={imagePreviews.length >= 4}
              />

              <button
                type="button"
                className="btn btn-outline-primary d-flex align-items-center gap-2"
                onClick={() => fileInputRef.current?.click()}
                disabled={imagePreviews.length >= 4}
              >
                <i className="bi bi-image" />
                {imagePreviews.length > 0
                  ? `${4 - imagePreviews.length} more ${
                      4 - imagePreviews.length === 1 ? 'image' : 'images'
                    } can be added`
                  : 'Add Photos'}
              </button>

              {imagePreviews.length > 0 && (
                <div className="d-flex flex-wrap gap-3 mt-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="position-relative" style={{ width: '100px', height: '100px' }}>
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="img-thumbnail h-100 w-100"
                        style={{ objectFit: 'cover' }}
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 rounded-circle"
                        style={{
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onClick={() => removeImage(index)}
                        aria-label="Remove image"
                      >
                        <i className="bi bi-x" size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-primary px-4 py-2 d-flex align-items-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="bi bi-paper-plane" />
                    Submit Review
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .form-control,
        .form-select {
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          transition: all 0.2s;
          border: 1px solid #dee2e6;
        }

        .form-control:focus,
        .form-select:focus {
          border-color: #86b7fe;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
        }

        .btn-primary {
          background-color: #0d6efd;
          border: none;
          border-radius: 0.5rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .btn-primary:hover {
          background-color: #0b5ed7;
          transform: translateY(-1px);
        }

        .btn-primary:active {
          transform: translateY(0);
        }

        .img-thumbnail {
          border-radius: 0.5rem;
          padding: 0.25rem;
          transition: all 0.2s;
        }

        .img-thumbnail:hover {
          transform: scale(1.05);
        }

        .star-rating {
          font-size: 1.5rem;
          color: #ffc107;
        }
      `}</style>
    </div>
  );
};

export default Reviews;

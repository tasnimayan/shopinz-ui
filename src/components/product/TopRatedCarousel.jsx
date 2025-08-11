import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import ProductStore from '../../store/ProductStore';
import { useEffect, memo } from 'react';
import SectionHeadline from './SectionHeadline';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const BASE_URL = import.meta.env.VITE_API_URL;

const TopRatedSlide = memo(({ item }) => (
  <div className="card" key={item._id}>
    <Link to={`/products/${item._id}`} className="w-100">
      <div className="card-body rounded-1" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="row d-flex align-items-center text-start">
          <div className="col-4 p-0" style={{ height: '100px' }}>
            <img
              className="w-100 h-100 rounded-2 object-fit-cover"
              src={item.image ? BASE_URL + item.image : ''}
              alt={item.title}
              loading="lazy"
            />
          </div>
          <div className="col-8">
            <h3 className="fs-6 fw-bold line-2">{item.title}</h3>
            <StarRatings
              rating={parseFloat(item.rating ?? 0)}
              starRatedColor="gold"
              starDimension="12px"
              starSpacing="1px"
            />
            <p className="fs-6 fw-semibold text-accent">${item.price}</p>
          </div>
        </div>
      </div>
    </Link>
  </div>
));
TopRatedSlide.displayName = 'TopRatedSlide';

const TopTrendingCarousel = () => {
  const { ListByRating, ListByRatingRequest } = ProductStore();

  useEffect(() => {
    ListByRatingRequest();
  }, [ListByRatingRequest]);

  if (!ListByRating) {
    return <div className="py-5 text-center">Loading...</div>;
  }

  return (
    <div className="container-fluid bg-white">
      <div className="px-5 pb-5">
        <SectionHeadline text="Top rated" />
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          breakpoints={{
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
          }}
          className="mySwiper"
        >
          {ListByRating.map((item) => (
            <SwiperSlide className="p-1" key={item._id}>
              <TopRatedSlide item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div>
          <i className="bi bi-arrow-right fs-2 float-end"></i>
        </div>
      </div>
    </div>
  );
};
export default TopTrendingCarousel;

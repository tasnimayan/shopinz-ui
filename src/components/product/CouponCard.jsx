export const CouponCard = ({ src }) => {
  src = src ? src : 'https://opencart4.magentech.com/themes/so_emarket/layout2/image/catalog/banners/id2-banner1.jpg';
  return (
    <div className="col-12 container">
      <div className="banner">
        <img src={src} alt="Coupon Banner" className="w-100" />
      </div>
    </div>
  );
};

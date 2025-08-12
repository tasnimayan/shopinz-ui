import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
const BASE_URL = import.meta.env.VITE_API_URL;

export const ProductImages = ({ images }) => {
  const formattedImages = images.map((item) => {
    return {
      original: BASE_URL + item,
      thumbnail: BASE_URL + item,
    };
  });

  return <ImageGallery autoPlay={true} items={formattedImages} />;
};

import Lottie from 'lottie-react';
import ImagePlaceholder from '../assets/images/image.json';
import Skeleton from 'react-loading-skeleton';

const DetailsSkeleton = () => {
  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-7 align-content-center p-1">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-6">
                <Lottie className="w-100" animationData={ImagePlaceholder} loop={true} />
              </div>
            </div>
            <div className="row justify-content-center">
              {Array.from({ length: 4 }).map((item, index) => {
                return (
                  <div className="col-2" key={index}>
                    <Lottie className="w-100" animationData={ImagePlaceholder} loop={true} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-md-5 p-1 gap-4  d-flex flex-column mt-4">
          {Array.from({ length: 5 }).map((item, index) => {
            return <Skeleton count={1} key={index} className="lh-lg" />;
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailsSkeleton;

import ProductStore from '../../store/ProductStore.js';
import { Link } from 'react-router-dom';
import SectionHeadline from './SectionHeadline.jsx';
import BrandsSkeleton from '../../skeleton/BrandsSkeleton.jsx';

export const BrandList = () => {
  const { BrandList } = ProductStore();

  if (BrandList === null) {
    return <BrandsSkeleton />;
  } else {
    return (
      <div className="section">
        <div className="row">
          <SectionHeadline text="Top brands" />
          {BrandList.map((item, i) => {
            return (
              <div key={i} className="col-3 text-center col-md-8r p-1">
                <Link to={`/by-brand/${item['_id']}`} className="card bg-white">
                  <div className="flex-center flex-column bg-white ">
                    <div className="p-2" style={{ width: '100px', height: '100px' }}>
                      <img
                        className="rounded-3 w-100 h-100 object-fit-contain"
                        src={item.brandImg}
                        alt={item.brandName}
                      />
                    </div>
                    <p className="bodySmal ">{item.brandName}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

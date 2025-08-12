import Skeleton from 'react-loading-skeleton';

export const LegalContentSkeleton = () => {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-12">
          <div className="card p-4">
            {Array.from({ length: 10 }).map((item, idx) => {
              return <Skeleton count={3} key={idx} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

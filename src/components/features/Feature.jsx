const features = [
  {
    title: 'Free Delivery',
    description: 'For all orders above $99',
    icon: 'bi bi-rocket-takeoff fs-2',
  },
  {
    title: '90 Days Return',
    description: 'If goods have problem',
    icon: 'bi bi-arrow-repeat fs-2',
  },
  {
    title: 'Secure Payment',
    description: '100% Secure Payment',
    icon: 'bi bi-credit-card fs-2',
  },
  {
    title: '24/7 Support',
    description: 'Dedicated support',
    icon: 'bi bi-headset fs-2',
  },
];
export const Features = () => {
  return (
    <div className="bg-white py-2 pt-5">
      <div className="container rounded-1">
        <div className="row">
          {features.map((feature, index) => (
            <div className="col-6 p-2 col-md-3 col-lg-3 col-sm-6" key={index}>
              <div className="card bg-transparent border shadow-smc">
                <div className="card-body">
                  <div className="row d-flex flex-column flex-lg-row align-items-center text-center text-lg-start">
                    <div className="col-md-3">
                      <i className={feature.icon}></i>
                    </div>
                    <div className="px-0 col-9">
                      <p className="fs-6 fw-bold">{feature.title}</p>
                      <span className="bodySmal">{feature.description}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

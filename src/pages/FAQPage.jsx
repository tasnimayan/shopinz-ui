import Layout from '../components/layout/Layout';

const FAQPage = () => {
  return (
    <Layout>
      <div className="row bg-orange py-2 container-fluid ">
        <h4 className="fs-lg fw-semibold font-raleway">Frequently Asked Question</h4>
      </div>
      <div className="container py-5">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button shadow-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                How to buy products?
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse
                plugin adds the appropriate classNamees that we use to style each element. These classNamees control the
                overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this
                with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can
                go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Accordion Item #2
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse
                plugin adds the appropriate classNamees that we use to style each element. These classNamees control the
                overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this
                with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can
                go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Accordion Item #3
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse
                plugin adds the appropriate classNamees that we use to style each element. These classNamees control the
                overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this
                with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can
                go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQPage;

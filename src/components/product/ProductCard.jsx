
const ProductCard = ({item}) => {
  let price=<p className="bodyMedium  text-dark my-1">Price: ${item['price']} </p>
  if(item['discount']===true){
      price=<p className="bodyMedium  text-dark my-1">Price:<strike> ${item['price']} < /strike> ${item['discountPrice']} </p>
  }
  return(
      <div className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
          <Link to={`/details/${item['_id']}`} className="card shadow-sm h-100 rounded-3 bg-white">
              <img className="w-100 rounded-top-2" src={item['image']} />
              <div className="card-body">
                  <p className="bodySmal text-secondary my-1">{item['title']}</p>
                  {price}
                  <StarRatings rating={parseFloat(item['star'])} starRatedColor="red" starDimension="15px" starSpacing="2px" />
              </div>
          </Link>
      </div>
  );
};

export default ProductCard;
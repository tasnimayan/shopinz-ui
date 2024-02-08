import ProductStore from "../../store/ProductStore.js";
import SliderSkeleton from "../../skeleton/slider-skeleton.jsx";
import {Link} from "react-router-dom";

const Slider = () => {

    const {SliderList}=ProductStore();

    if(SliderList===null){
        return <SliderSkeleton/>
    }
    else {
        return (
            <div>
                <div id="carouselExampleDark" className="carousel hero-bg carousel-dark slide">
                    <div className="carousel-indicators">
                        {SliderList.map((item,i)=>{
                            return(
                                <button style={{width:"8px", height:"8px", borderRadius:"50%", backgroundColor:"gray"}} key={i} type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={i} className="active" aria-current="true" aria-label=""></button>
                            )
                        })}

                    </div>
                    <div className="carousel-inner py-5">
                        {
                            SliderList.map((item,i)=>{
                                let active="carousel-item"
                                if(i===0){
                                    active="carousel-item active"
                                }
                                return (
                                    <div key={i} className={active} data-bs-interval="10000">
                                        <div className="container ">
                                            <div className="row justify-content-center">
                                                <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                                                    <h1 className="headline-1 text-teal fw-bold">{item['title']}</h1>
                                                    <p>{item['des']}</p>
                                                    <Link to="" className="btn text-white btn-success" style={{width:'130px'}}>Men</Link>
                                                    <Link to="" className="btn text-white btn-success ms-2" style={{width:'130px'}}>Women</Link>
                                                </div>
                                                <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                                                    <img src={item['image']} className="w-100" alt="..." />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className="carousel-control-prev btn rounded-5" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next btn" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

        );
    }

};

export default Slider;
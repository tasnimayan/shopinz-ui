import React, {useEffect, useState} from 'react';
import ProductStore from "../../store/ProductStore.js";
import ProductsSkeleton from "../../skeleton/products-skeleton.jsx";
import ProductCard from './ProductCard.jsx';


const ProductList = () => {
    // onClick={()=>{ListByRemarkRequest("trending")}}

    const {ListProduct,BrandListRequest,BrandList,CategoryList,CategoryListRequest,ListByFilterRequest}=ProductStore();
    let [Filter,SetFilter]=useState({brandID:"", categoryID:"", priceMax:"", priceMin:""}) 


    const inputOnChange=async (name,value)=>{
        SetFilter((data)=>({
            ...data,
            [name]:value
        }))
    }


    useEffect(() => {
        (async ()=>{
            BrandList===null?await BrandListRequest():null;
            CategoryList===null?await CategoryListRequest():null;

            let isEveryFilterPropertyEmpty = Object.values(Filter).every(value => value==="");
            !isEveryFilterPropertyEmpty?await ListByFilterRequest(Filter):null

        })()
    }, [Filter]);


    return (
        <div className="container-fluid mt-2">
            <div className="row">
                <div className="col-md-3 p-2">
                    <div className='px-3'>
                        <div className="card vh-100 p-3 shadow-sm">
                            <label className="form-label mt-3">Brands</label>
                            <select value={Filter.brandID} onChange={async (e)=>{await inputOnChange('brandID',e.target.value)}}  className="form-control form-select">
                                <option value="">Choose Brand</option>
                                {BrandList!==null?(
                                    BrandList.map((item,i)=>{
                                        return (
                                            <option value={item['_id']} >{item['brandName']}</option>
                                        )
                                    })

                                ):<option></option>}

                            </select>
                            <label className="form-label mt-3">Categories</label>
                            <select value={Filter.categoryID} onChange={async (e)=>{await inputOnChange('categoryID',e.target.value)}} className="form-control form-select">
                                <option value="">Choose Category</option>
                                {CategoryList!==null?(
                                    CategoryList.map((item,i)=>{
                                        return (<option value={item['_id']}>{item['categoryName']}</option>)
                                    })

                                ):<option></option>}



                            </select>
                            <label className="form-label mt-3">Maximum Price ${Filter.priceMax}</label>
                            <input value={Filter.priceMax} onChange={async (e)=>{await inputOnChange('priceMax',e.target.value)}} min={0} max={1000000} step={1000} type="range" className="form-range" />


                            <label className="form-label mt-3">Minimum Price ${Filter.priceMin}</label>
                            <input value={Filter.priceMin} onChange={async (e)=>{await inputOnChange('priceMin',e.target.value)}} min={0} max={1000000} step={1000} type="range" className="form-range" />
                        </div>
                    </div>
                </div>

                <div className="col-md-9 p-2">
                    <div className="row">
                        {
                            ListProduct===null?(<ProductsSkeleton/>):(
                                <div className="container">
                                    <div className="row">
                                    {
                                        ListProduct.map((item,i)=>{
                                            return <ProductCard item={item} key={i} className={"product-card col-md-4 p-2 col-lg-3 col-6"}/>
                                        })
                                    }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
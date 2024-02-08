import React from 'react';
import FeatureStore from "../../store/FeatureStore.js";
import FeaturesSkeleton from "../../skeleton/features-skeleton.jsx";

const Features = () => {
    const {FeatureList}=FeatureStore();

    if(FeatureList===null){
        return <FeaturesSkeleton/>
    }
    else {
        return (
            <div className="container section">
                <div className="row">
                    {FeatureList.map((item,i)=>{
                        return (<div key={i} className="col-6 p-2 col-md-3 col-lg-3 col-sm-6">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="row d-flex flex-column flex-lg-row align-items-center text-center text-lg-start">
                                        <div className="col-3">
                                            <img alt="img" className="w-100" src={item['img']} />
                                        </div>
                                        <div className="px-0 col-9">
                                            <h3 className="fs-6 fw-bold">{item['name']}</h3>
                                            <span className="bodySmal">{item['description']}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    })}
                </div>
            </div>
        );
    }

};

export default Features;
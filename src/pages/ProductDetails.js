import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import stock from '../data.json';
import PicturesHolder from "../components/PicturesHolder";
import ProductInfo from "../components/ProductInfo";
import Breadcrumbs from "../components/Breadcrumbs";

const ProductDetails = (props) => {

   const [product, getProduct] = useState({});
   const { id } = useParams();

   
    useEffect( () => {  
      if(product.name === undefined){
         let prod = stock.filter( item => item.id === Number(id));
         prod[0].image = prod[0].images[0];
         getProduct(prod[0]); 
      }
     
    });


    return(
      <React.Fragment>
       <Breadcrumbs name={product.name}/>
       <div className="product-detail-container ui two column doubling stackable grid container">
          <div className="column">
            {product.images &&
             <PicturesHolder images={product.images} />
            }
          </div>
          <div className="column">
           <ProductInfo data={product} />
          </div>
       </div>
      </React.Fragment>
    )
}



export default ProductDetails;
import React, { useState, useEffect } from "react";
import ProductItem from "../components/ProductItem"
import stock from '../data.json';



const ProductsList = (props) => {
    //store products
    const [products, getProducts] = useState([]);

    useEffect( () => {  
        //here maybe u want to request the data from the server
        getProducts(stock);
    });

 return ( 
    <div className="ui four column doubling stackable grid container">
      <div className="ui link cards">
       {products.map((item, i) => (
           <ProductItem item={item} key={i}/>
       ))}
      </div>
    </div>
 )

}

export default ProductsList;
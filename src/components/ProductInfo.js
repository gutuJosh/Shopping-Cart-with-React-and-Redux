import React, { useState, useEffect } from "react";
import Selector from "./Selector";
import AddToBasketBtn from "./AddToBasketBtn";

const ProductInfo = (props) => {
  //create sizes state to manage multiple sizes
  const [sizes, setSizes] = useState([]);
  //store user selected size
  const [selectedSize, setSelectedSize] = useState(false);
  //store available quintities for a given size
  const [avalQty, setAvalQty] = useState([]);
  //store user selected quantity for a previous selected size
  const [selectedQty, setSelectedQty] = useState(false);

   
  useEffect( () => {  
    //get available sizes and quantitites
    if(props.data.size && sizes.length === 0){
      
       var size = [];
       props.data.size.forEach( item => {
            size.push({
              'value': `${item.size}-${item.qty}`,
              'name': item.size
            });
       });
       setSizes(size);
       setSelectedSize(size[0].name);//set first value as default selected size
       getQty(size[0].value);//set the first value as default selected qty
    }
  
  });

  const [modelDetails, setDetails] = useState([]);
   useEffect( () => {  
    if(props.data.modelDetails){
      setDetails(props.data.modelDetails);
   }
  });

  //This function passed to the size selector component will return the user selected size and the quantity availabale for that size 
  const getQty = (value) => {
    //because the value var contain the contactenated size and available quantities in a string we have to split it
    const getValue = value.split('-');
    const getAvailableQty = [];
    for(let i = 1; i <= Number(getValue[1]); i++){
      getAvailableQty.push({
         'name' : i,
         'value' : i
      });
    }
    //when yhe user pick a size always reset the selected qunatity to the first available value
    setSelectedQty(getAvailableQty[0].value);
    //update available quantities
    setAvalQty(getAvailableQty);
    //update selectedSize
    setSelectedSize(Number(getValue[0]));
   
  }

  //This function passed to quantity selector component will return the user selected quantity for the current product 
  const setQty = (qty) => setSelectedQty(qty);



    return(
      <React.Fragment>
        <div className="product-title">
         <h1>{props.data.name}</h1>
         {props.data.discount ? 
         <h3>
           {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format((props.data.price - ((props.data.price * props.data.discount) / 100)))}
           <span className="initial-price">{new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(props.data.price)}</span>
          </h3>
          :
          <h3>
          {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(props.data.price)}
         </h3>
         }
         <p>
             {props.data.details}
             <br/>
             {props.data.composition}
         </p>
         {modelDetails.map((item, i) => (
           <p key={i}>{item}</p>   
         ))} 
          <div className="ui grid">
          <div className="ten wide column">
            {sizes.length > 0 && avalQty.length > 0 &&
            <Selector 
             name="size" 
             placeholder="Pick your size"
             options={sizes}
             getValue={getQty}
             />
            }
          </div>
          <div className="six wide column">
          {avalQty.length > 0 &&
           <Selector 
             name="quantity" 
             placeholder="Select quantity"
             options={avalQty}
             getValue={setQty}
             selectedValue={selectedQty}
             />
           }
          </div>
         </div>
         {selectedSize && selectedQty &&
          <AddToBasketBtn product={props.data} qty={selectedQty} size={selectedSize}/>
         }
        </div>
       
      </React.Fragment>
    )
}

export default ProductInfo;
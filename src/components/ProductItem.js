import React, { useState, useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import Message from "./Message";
import { addBasket } from '../actions/addActions';



const ProductItem = (props) => {
    //create a message state to set feedback to the user
    const [message, setMessage] = useState({
      'type':'',
      'title':'',
      'text':''
    });
   //create visibility state to manage message visibility
   const [visible, toggleVisibility] = useState(false);
   //store user selected size
   const [userSize, setSize] = useState(false);
   
 
   let history = useHistory();

    useEffect( () => {  
      if(userSize === false){
        const currentProduct = {};
        for (const val in props.item) {
             currentProduct[val] = props.item[val] 
        }
        //set default selected size to first size in the size list
        setSize(currentProduct.size[0].size);
      }
     
    });


    const addProductToShoppingCart = () => {
       //setup feedback to the user
       let message = {
         'type': 'success',
         'title':'Success',
         'text':'The product was added to your shopping bag sucessfully!'
       };
       //set a semaphore to prevent adding duplicate items to the basket
       let addToBasket = true;
       //get only the products with the same id from the basket
       const Basket = props.basketProps.basket.filter(item => item.id === props.item.id);
       //check if the product with the same size is already in the basket
       //in such case we don't want to add the product into the basket so we set addToBasket to false
       Basket.forEach(item => {
         if( (item.selectedSize === userSize) ){
            message = {
               'type': 'warning',
               'title':'Warning',
               'text':'The product is already in your shopping bag!'
            }
            addToBasket = false;
         }
       });

       //check the semaphore
       if(addToBasket){//we have a new product so add item to basket 
         let product = {...props.item};
         product['selectedSize'] = userSize;
         product['selectedQty'] = 1; //set qty to 1
         props.addBasket(product);
       
       }
      //give feedback to the user
      setMessage(message);
      toggleVisibility(true);
    }

   

 return ( 
    <div className="card">
     <div className="image">
        <img src={props.item.images[0]} alt={props.item.name} onClick={() => history.push(`/details/${props.item.id}`)}/>
     </div>
     <div className="content">
     <div className="header" onClick={() => history.push(`/details/${props.item.id}`)}>{props.item.name}</div>
     <div className="meta">
      {props.item.discount > 0 ? //if we have a discount recalculate final price
      <a>
       {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(props.item.price - (props.item.price * props.item.discount / 100))}
       <span className="initial-price">{new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(props.item.price)}</span>
      </a>
      :
      <a>{new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(props.item.price)}</a>
      }
      {props.item.size &&
      <p className="available-sizes">
         <span>Size: </span>
         {props.item.size.map((item, i) => (
            <small 
               key={i} 
               className={userSize === item.size ? 'active' : ''}
               onClick = {() => setSize(item.size)}
               >
                  {item.size}
               </small>
         ))}
      </p>
      }
     </div>
     {visible &&
            <Message
             type={message.type} 
             title={message.title} 
             text={message.text} 
             onClose={ ()=> toggleVisibility(false)}
             />
      }
     </div>
     <div className="extra content">
      <span 
       className="right floated buy-btn" 
       title="Add to bag"
       onClick={addProductToShoppingCart}
       >
       <i className="shopping bag icon"></i>
      </span>
     <NavLink to={`/details/${props.item.id}`}><span>View details</span></NavLink>
    </div> 
    </div>
 )

}

const mapStateToProps = state => ({
   basketProps : state.basketState
})

export default connect(mapStateToProps, { addBasket }) (ProductItem)
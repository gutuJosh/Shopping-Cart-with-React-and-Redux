import React, { useState, Suspense } from "react";
import { connect } from 'react-redux';
import {NavLink} from "react-router-dom";
import CartItem from "../components/CartItem";


//import components dynmaically
function loadComponent(name) {
  const Component = React.lazy(() =>
    import(`../components/${name}.js`)
  );
  return Component;
}



const ShoppingCart = (props) => {

  if(props.basketProps.basket.length > 0){ //Shopping cart is not empty
    
   //set a semaphore to dynamically load the Paypal component
   const [semaphore, changeSemaphorColor] = useState('red');
   //store shipping price
   const [shipping, setShipping] = useState(0);

  //load ShippingForm component
  let CheckoutModule = loadComponent('ShippingForm');
  //load paypal component
  const PaymentModule = (semaphore === 'green') ? loadComponent('Paypal') : false;
    
    
    const calculateSubtotal = (format) => {
        const Basket = props.basketProps.basket;
        let subtotal = 0;
        Basket.forEach(item => {
           let price = item.discount > 0 ? //aply discount
                       (item.price - (item.price * item.discount / 100))
                       :
                       item.price;
            subtotal += (price * item.selectedQty);
        });

        return format ? new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(subtotal) : subtotal;
    }


    //this function passed to the ShippingForm component will retrun user shipping info when onSubmit event will fire 
    const getShippingInfo = (data) => {
      //here u may want to validate and send data to the server
      //.......
      //if data is ok
      setShipping(data.shippingPrice);
      changeSemaphorColor('green');//set green color in order to load the paypal component
    }


   
    


    
    return(
        <div className="ui four column doubling stackable grid container shopping-cart">
        
        <div className="ten wide column">
        <h1>Your Shopping Bag:</h1>
        <div className="cart-items">
        {props.basketProps.basket.map((item, i) => (
            <CartItem data={item} key={i}/>
        ))}   
        </div>
        <div className="cart-footer">
         <NavLink to={`/`}>
           <i className="arrow left icon"></i> Continue shopping
         </NavLink>
         <span>Subtotal: {calculateSubtotal(true)}</span>
         </div>
        </div>
        <div className="six wide column checkout">
         <Suspense fallback={<div>Loading...</div>}>
           {semaphore === 'green' ?
            <PaymentModule backLink={() => changeSemaphorColor('red')}  shippingPrice={shipping} subtotal={calculateSubtotal(false)}/>
            :
            <CheckoutModule subtotal={calculateSubtotal(false)} saveData={getShippingInfo}/>
           }
         </Suspense>
        </div>
        </div> 
    )
  }
  else{ //Shopping cart is empty
      let MessageModule = loadComponent('Message');
      return(
        <div className="ui four column doubling stackable grid container full">
         <Suspense fallback={<div>Loading...</div>}>
            <MessageModule 
            type="warning"
            title="Warning"
            text="Your shopping bag is empty!"
            onClose={ (e)=> e.preventDefault()}
            />
            <NavLink to={`/`}><span><i className="angle left icon"></i> Back to store</span></NavLink>
          </Suspense>
         </div>
      )
  }


}

const mapStateToProps = state => ({
    basketProps : state.basketState
})

export default connect(mapStateToProps)(ShoppingCart)
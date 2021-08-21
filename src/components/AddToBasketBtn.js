import React, { useState } from "react";
import { connect } from 'react-redux';
import { addBasket, updateBasket } from '../actions/addActions';
import Message from "./Message";

const AddToBasketBtn = (props) => {
    //create a message state to set feedback to the user
    const [message, setMessage] = useState({
        'type':'',
        'title':'',
        'text':''
    });
    //create visibility state to manage message visibility
    const [visible, toggleVisibility] = useState(false);
    
    //create a delay var for storing delaied actions
    let delay;
   
    
    const AddProductToShoppingBag = (product) => {
        let message = {};//prepare empty message object to deal with later on
        //get the current products in the basket
        let Basket = props.basketProps.basket;
       const getProductsId = Basket.map(item => item.id); //extract product ids so we can further check if the item is not already in the basket
       
       if(!getProductsId.includes(product.id)){//we have a new product so add item to basket 
           //add new properties to the item, necessary in order to update the quantity of an item later on
           product['selectedSize'] = props.size;
           product['selectedQty'] = props.qty;
           props.addBasket(product);//update store by pushing the new item into the basket
           //setup feedback to the user
           message = {
            'type': 'success',
            'title':'Success',
            'text':'The product was added to your shopping bag sucessfully!'
           };
       }
       else{
        //the product is already in the basket
        let newSize = true,
            update = false;
        Basket.forEach(item => {
          if( (item.id === product.id) && (item.selectedSize === props.size) ){//indetifying the product
                
                //the id and size is matching so we have to update qty for this item
                newSize = false;
                if(item.selectedQty !== props.qty && item.selectedSize === props.size){ //the new qty value is diffrent from the last saved value
                 //so update item qty
                 item.selectedQty = props.qty;
                 update = true;
                }
                else{
                //the new qty value is the same with the last saved value
                //create a warrning message
                message = {
                    'type': 'orange',
                    'title':'Warning',
                    'text':'The product is already in your shopping bag!'
                   };
                }
                
            }
        });
        
        //add the product as a new one
        if(newSize === true){
            let item = {...product};
            item['selectedSize'] = props.size;
            item['selectedQty'] = props.qty;
            props.addBasket(item);//push a new item in the cart and update store
            //prepare message for the user
            message = {
                'type': 'success',
                'title':'Success',
                'text':'The product was added to your shopping bag sucessfully!'
               };
        }
        //update whole basket
        if(update === true){
           props.updateBasket(Basket);//update store
           //prepare message for the user
           message ={
            'type': 'success',
            'title':'Updated sucessfully!',
            'text':'The quantity of this item was updated sucessfully!'
           };
        }
       }

       //give feedback to user by displaing the message
       if(message.hasOwnProperty('type')){
          setMessage(message);
          toggleVisibility(true);
          clearTimeout(delay);
       }
    }




    return(
        <React.Fragment>
            {visible &&
            <Message
             type={message.type} 
             title={message.title} 
             text={message.text} 
             onClose={ ()=> toggleVisibility(false)}
             />
            }
            <button 
            id="bag-btn" 
            className="fluid ui button negative" 
            onClick={() => {
                AddProductToShoppingBag(props.product);
                //hide message
                delay = setTimeout( () => toggleVisibility(false), 2000);
                
            }}
            >
                ADD TO BAG <i className="shopping bag icon"></i>
            </button>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    basketProps : state.basketState
})
  
export default connect(mapStateToProps, { addBasket, updateBasket })(AddToBasketBtn)
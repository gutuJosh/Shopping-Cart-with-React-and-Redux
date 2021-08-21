import React, { useState, useEffect } from "react";
import Selector from "./Selector";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { updateBasket, removeBasket } from '../actions/addActions';

var qty = [];

const CartItem = (props) => {

  let history = useHistory();

  //store available quintities for a given size
  const [avalQty, setAvalQty] = useState([]);

  useEffect( () => {   
    
    if(avalQty.length === 0) { 
     props.data.size.forEach( item => {
        if(item.size === props.data.selectedSize){
            for(let i = 1; i <= Number(item.qty); i++){
                qty.push({
                'name' : i,
                'value' : i
                });
            }
            setAvalQty(qty);
            qty = [];
        }
     });
    }
   });

    //This function passed to quantity selector component will update the quantity for the current product
    const updateQty = (qty) => {
        let basket = props.basketProps.basket;
        basket.forEach( item => {
            if(item.id === props.data.id && item.selectedSize === props.data.selectedSize){
                item.selectedQty = qty;
                props.updateBasket(basket);
            }
        })
    };

    const removeFromBasket = (e) => {
        e.preventDefault();
        props.removeBasket({
            'id' : props.data.id,
            'size' : props.data.selectedSize
        })

    }

  
    return(
        <div className="flex">
           <div className="flex-item image">
              <img src={props.data.images[0]} alt={props.data.name} onClick={() => history.push(`/details/${props.data.id}`)}/>
           </div>
          <div className="flex-item name">
           <h4 onClick={() => history.push(`/details/${props.data.id}`)}>{props.data.name}</h4>
           <p>Size: {props.data.selectedSize}</p> 
         </div>
         <div className="flex-item qty">
           <Selector 
             name="quantity" 
             placeholder="Quantity"
             options={avalQty}
             getValue={updateQty}
             selectedValue={props.data.selectedQty}
             />
         </div>
         <div className="flex-item price">
          {props.data.discount ? 
          <h4>
           {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format((props.data.price - ((props.data.price * props.data.discount) / 100)))}
           <br/>
           <span className="initial-price">{new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(props.data.price)}</span>
          </h4>
          :
          <h4>
          {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(props.data.price)}
          </h4>
          }
         </div>
         <div className="flex-item trash">
             <a href="/" onClick={removeFromBasket} title="Remove from cart">
              <i className="trash alternate icon"></i>
             </a>
         </div>
        </div>
    )
}


const mapStateToProps = state => ({
    basketProps : state.basketState
})

export default connect(mapStateToProps, { updateBasket, removeBasket })(CartItem)

import { ADD_TO_BASKET }  from '../actions/types';
import { REMOVE_FROM_BASKET }  from '../actions/types';
import { UPDATE_BASKET }  from '../actions/types';

const products = (typeof(Storage) !== "undefined") && (typeof(localStorage['basket']) !== "undefined") ? JSON.parse(localStorage['basket']) : [];

const initialState = {
   basket : products
};


export default (state = initialState, action) => {


   switch(action.type){
        
       case ADD_TO_BASKET:

             products.push(action.payload);

             
             if(typeof(Storage) !== "undefined"){//update localStorage
              localStorage.setItem('basket', JSON.stringify(products))
             }
             return {
                  basket : products
             }
           
       case REMOVE_FROM_BASKET:
           
            products.forEach((item, index) => {
               if((item.id === action.payload.id) && 
                  (item.selectedSize === action.payload.size)
                 ){
                   products.splice(index,1);
               }
            });
             if(typeof(Storage) !== "undefined"){//update localStorage
               localStorage.setItem('basket', JSON.stringify(products))
             }
             return{
                basket : products
             }

        case UPDATE_BASKET:
           
            let prod = action.payload;
            if(typeof(Storage) !== "undefined"){//update localStorage
               localStorage.setItem('basket', JSON.stringify(prod))
            }
            return {
                    basket : prod
            }



       default:
        return state;

   }
};
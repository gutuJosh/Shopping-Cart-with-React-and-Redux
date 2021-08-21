import { ADD_TO_BASKET, REMOVE_FROM_BASKET, UPDATE_BASKET } from './types.js';

export const addBasket = (product) => {
    return (dispatch) => {
        
        dispatch({
            type: ADD_TO_BASKET,
            payload: product
        })
    }
}


export const removeBasket = (product) => {
    return (dispatch) => {
        dispatch({
            type: REMOVE_FROM_BASKET,
            payload: product
        })
    }
}

export const updateBasket = (products) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_BASKET,
            payload: products
        })
    }
}



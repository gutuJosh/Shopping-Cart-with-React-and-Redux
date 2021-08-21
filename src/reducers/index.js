import { combineReducers } from 'redux';
import BasketReducer from './BasketReducer.js';

export default combineReducers({
       basketState: BasketReducer
});
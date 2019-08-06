import { combineReducers } from 'redux';
import comments from './comments.js';
import products from './products.js';
import orders from './orders.js';
import shops from './shops.js';

const reducer = combineReducers({
    comments,
    products,
    orders,
    shops
})

export default reducer;

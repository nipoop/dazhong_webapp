import { combineReducers } from 'redux';
import comments from './comments.js';
import products from './products.js';
import orders from './orders.js';
import shops from './shops.js';
import keywords from './keywords.js';

const reducer = combineReducers({
    comments,
    products,
    orders,
    shops,
    keywords
})

export default reducer;

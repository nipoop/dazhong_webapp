//combineReducer
import { combineReducers } from 'redux';
import app from './app.js';
import detail from './detail.js';
import home from './home.js';
import entities from './entities';
import search from './search.js';
import login from './login.js';
import user from './user.js';
import purchase from './purchase.js';

const rootReducer = combineReducers({
    entities,
    home,
    detail,
    app,
    search,
    login,
    user,
    purchase
});
export default rootReducer;

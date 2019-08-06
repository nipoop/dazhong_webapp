//combineReducer
import { combineReducers } from 'redux';
import app from './app.js';
import detail from './detail.js';
import home from './home.js';
import entities from './entities';

const rootReducer = combineReducers({
    entities,
    home,
    detail,
    app
});
export default rootReducer;

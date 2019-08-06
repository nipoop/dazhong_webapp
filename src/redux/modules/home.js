import url from '../../utils/url.js';
import { schema } from './entities/products.js';
import { FETCH_DATA } from '../middleware/api.js';
import { combineReducers } from 'redux';


//定义actionType
export const actionTypes = {
    //开始发送请求
    FETCH_LIKES_REQUEST: 'HOME/FETCH_LIKES_REQUEST',
    //获取请求成功
    FETCH_LIKES_SUCCESS: 'HOME/FETCH_LIKES_SUCCESS',
    //获取请求失败
    FETCH_LIKES_FAILURE: 'HOME/FETCH_LIKES_FAILURE',
    //fetch_discount
    FETCH_DISCOUNTS_REQUEST: 'HOME/FETCH_DISCOUNTS_REQUEST',
    FETCH_DISCOUNTS_SUCCESS: 'HOME/FETCH_DISCOUNTS_SUCCESS',
    FETCH_DISCOUNTS_FAILURE: 'HOME/FETCH_DISCOUNTS_FAILURE'
}


//定义actionCreater

const fetchLikes = (endpoint) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_LIKES_REQUEST,
            actionTypes.FETCH_LIKES_SUCCESS,
            actionTypes.FETCH_LIKES_FAILURE
        ],
        schema,
        endpoint
    }
})

const fetchDiscounts = (endpoint) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_DISCOUNTS_REQUEST,
            actionTypes.FETCH_DISCOUNTS_SUCCESS,
            actionTypes.FETCH_DISCOUNTS_FAILURE
        ],
        schema,
        endpoint
    }
})

const params = {
    PATH_LIKES: 'likes',
    PATH_DISCOUNTS: 'discounts',
    PAGE_SIZE_LIKES: 5,
    PAGE_SIZE_DISCOUNTS:3
}

export const actions = {
    loadLikes: () => {
        return (dispatch, getState) => {
            const { pageCount } = getState().home.likes;
            const rowIndex = pageCount * params.PAGE_SIZE_LIKES;
            const endpoint = url.getProductList(params.PATH_LIKES, rowIndex, params.PAGE_SIZE_LIKES);
            return dispatch(fetchLikes(endpoint));
        }
    },
    loadDiscounts: () => {
        return (dispatch, getState) => {
            if (getState().home.discounts.ids.length === 3) {
                return null;
            }
            const endpoint = url.getProductList(params.PATH_DISCOUNTS, 0, params.PAGE_SIZE_DISCOUNTS);
                return dispatch(fetchDiscounts(endpoint));
        }
    }

}

const initialState = {
    likes: {
        isFetching: false,
        pageCount: 0,
        ids: []
    },
    discounts: {
        isFetching: false,
        ids: []
    }
}

//定义reducer
const likes = (state = initialState.likes, action) => {
    switch(action.type) {
        case actionTypes.FETCH_LIKES_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.FETCH_LIKES_SUCCESS:
            return {
            ...state,
            isFetching: false,
            pageCount: state.pageCount + 1,
            ids: state.ids.concat(action.response.ids)
        };
        case actionTypes.FETCH_LIKES_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        default:
            return state;
    }
}

const discounts = (state = initialState.discounts, action) => {
    switch(action.type) {
        case actionTypes.FETCH_DISCOUNTS_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.FETCH_DISCOUNTS_SUCCESS:
            return {
            ...state,
            isFetching: false,
            ids: state.ids.concat(action.response.ids)
        };
        case actionTypes.FETCH_DISCOUNTS_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        default:
            return state;
    }
}

//定义selector
export const getLikes = (state) => {
    return state.home.likes.ids.map(id => {
        return state.entities.products[id];
    });
}

export const getDiscounts = (state) => {
    return state.home.discounts.ids.map(id => {
        return state.entities.products[id];
    });
}

export const getPageCountOfLikes = (state) => {
    return state.home.likes.pageCount;
}

const reducer = combineReducers({
    likes,
    discounts
})

export default reducer;

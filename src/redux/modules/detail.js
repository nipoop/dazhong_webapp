import url from '../../utils/url.js';
import { FETCH_DATA } from '../middleware/api.js';
import { combineReducers } from 'redux';
import { schema as productSchema,  getProductDetail, getProductById } from './entities/products.js';
import { schema as shopSchema,  getShopById } from './entities/shops.js';


const initialState = {
    product: {
        isFetching: false,
        id: null
    },
    relatedShop: {
        isFetching: false,
        id: null
    }
}

export const actionTypes = {
    //定义商品详情的actiontype
    FETCH_PRODUCT_DETAIL_REQUEST: 'DETAIL/FETCH_PRODUCT_DETAIL_REQUEST',
    FETCH_PRODUCT_DETAIL_SUCCESS: 'DETAIL/FETCH_PRODUCT_DETAIL_SUCCESS',
    FETCH_PRODUCT_DETAIL_FAILURE: 'DETAIL/FETCH_PRODUCT_DETAIL_FAILURE',

    //定义商店信息的actionType
    FETCH_SHOP_REQUEST: 'DETAIL/FETCH_SHOP_REQUEST',
    FETCH_SHOP_SUCCESS: 'DETAIL/FETCH_SHOP_REQUEST',
    FETCH_SHOP_FAILURE: 'DETAIL/FETCH_SHOP_REQUEST'
}

export const actions = {
    loadProductDetail: (id) => {
        return (dispatch, getState) => {
            const product = getProductDetail(getState(), id);
            if (product) {
                return dispatch(fetchProductDetailSuccess(id));
            }
            const endpoint = url.getProductDetail(id)
            return dispatch(fetchProductDetail(endpoint, id));
        }
    },
    loadRelatedShop: (id) => {
        return (dispatch, getState) => {
            const shop = getShopById(getState(), id);
            if (shop) {
                return dispatch(fetchShopSuccess(id));
            }
            const endpoint = url.getShop(id);
            return dispatch(fetchShop(endpoint, id));
        }
    }
}
//定义获取产品详情成功action
const fetchProductDetailSuccess = (id) => ({
    type: actionTypes.FETCH_PRODUCT_DETAIL_SUCCESS,
    id
})

//定义获取商店信息成功action
const fetchShopSuccess = (id) => ({
    type: actionTypes.FETCH_SHOP_SUCCESS,
    id
})

//定义可被中间件api处理的异步action
const fetchProductDetail = (endpoint, id) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_PRODUCT_DETAIL_REQUEST,
            actionTypes.FETCH_PRODUCT_DETAIL_SUCCESS,
            actionTypes.FETCH_PRODUCT_DETAIL_FAILURE
        ],
        schema: productSchema,
        endpoint
    },
    id
})
const fetchShop = (endpoint, id) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_SHOP_REQUEST,
            actionTypes.FETCH_SHOP_SUCCESS,
            actionTypes.FETCH_SHOP_FAILURE
        ],
        schema: shopSchema,
        endpoint
    },
    id
})

//定义商品详情reducer
const product = (state = initialState.product, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCT_DETAIL_REQUEST:
            return { ...state, isFetching: true };
        case actionTypes.FETCH_PRODUCT_DETAIL_SUCCESS:
            return { ...state, isFetching: false, id: action.id };
        case actionTypes.FETCH_PRODUCT_DETAIL_FAILURE:
            return { ...state, isFetching: false, id: null };
        default:
            return state;
    }
}

const relatedShop = (state = initialState.relatedShop, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SHOP_REQUEST:
            return { ...state, isFetching: true };
        case actionTypes.FETCH_SHOP_SUCCESS:
            return { ...state, isFetching: false, id: action.id };
        case actionTypes.FETCH_SHOP_FAILURE:
            return { ...state, isFetching: false, id: null };
        default:
            return state;
    }
}

const reducer = combineReducers({
    product,
    relatedShop
})


//定义详情页需要的selector
export const getProduct = (state, id) => {
    return getProductDetail(state, id);
}
export const getRelatedShop = (state, productId) => {
    const product = getProductById(state, productId);
    let shopId = product ? product.nearestShop : null;
    if(shopId) {
        return getShopById(state, shopId);
    }
    return null;
}

export default reducer;

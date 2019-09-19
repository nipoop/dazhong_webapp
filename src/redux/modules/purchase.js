import { actions as orderActions, AVAILABLE_TYPE } from './entities/orders.js';
import { getProductDetail } from './entities/products.js';
const initialState = {
    quantity: 0,
    showTip: false
}

const actionTypes = {
    SET_ORDER_QUANTITY: 'PURCHASE/SET_ORDER_QUANTITY',
    HIDE_TIP: 'PURCHASE/HIDE_TIP',
    SUBMIT_ORDER_REQUEST: 'PURCHASE/SUBMIT_ORDER_REQUEST',
    SUBMIT_ORDER_SUCCESS: 'PURCHASE/SUBMIT_ORDER_SUCCESS',
    SUBMIT_ORDER_FAILURE: 'PURCHASE/SUBMIT_ORDER_FAILURE'
}

export const actions = {
    setOrderQuantity: quantity => ({
        type: actionTypes.SET_ORDER_QUANTITY,
        quantity
    }),
    hideTip: () => ({
        type: actionTypes.HIDE_TIP
    }),
    submitOrder: productId => {
        return (dispatch, getState) => {
            dispatch(submitOrderRequest());
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const product = getProductDetail(getState(), productId);
                    console.log('product', product)
                    const quantity = getState().purchase.quantity;
                    const totalPrice = (product.currentPrice * quantity);
                    const text1 = `${quantity}张 | 总价: ${totalPrice}`;
                    const text2 = product.validityPeriod;
                    const order = {
                        title: `${product.shop}:${product.product}`,
                        orderPicUrl: product.picture,
                        channel: '团购',
                        statusText: '待消费',
                        text: [text1, text2],
                        type: AVAILABLE_TYPE
                    }
                    dispatch(orderActions.addOrder(order))
                    dispatch(submitOrderSuccess())
                }, 500);
            })
        }
    }
}
const submitOrderRequest = () => ({
    type: actionTypes.SUBMIT_ORDER_REQUEST
})
const submitOrderSuccess = () => ({
    type: actionTypes.SUBMIT_ORDER_SUCCESS
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ORDER_QUANTITY:
            return { ...state, quantity: action.quantity };
        case actionTypes.SUBMIT_ORDER_SUCCESS:
            return { ...state, showTip: true };
        case actionTypes.HIDE_TIP:
            return { ...state, showTip: false }
        default:
            return state;
    }
}
export default reducer;

export const getShowTip = (state) => {
    return state.purchase.showTip;
}
export const getQuantity = (state) => {
    return state.purchase.quantity;
}
export const getProduct = (state, productId) => {
    return getProductDetail(state, productId)
}

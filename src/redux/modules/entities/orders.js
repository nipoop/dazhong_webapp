
export const schema = {
    name: 'orders',
    id: 'id'
}

const reducer = (state = {}, action) => {
    if (action.response && action.response.orders) {
        return {
            ...state,
            ...action.response.orders
        };
    }
    switch (action.type) {
        case actionTypes.DELETE_ORDER:
            const { [action.orderId]: deleteOrder, ...restOrders } = state;
            return restOrders;
        case actionTypes.ADD_COMMENT:
            return {
                ...state,
                [action.orderId]: {
                    ...state[action.orderId],
                    commentId: action.commentId
                }
            };
        case actionTypes.ADD_ORDER:
            return {
                ...state,
                [action.orderId]: action.order
            }
        default:
            return state;
    }
}
export default reducer;
export const USED_TYPE = 1; // 已消费
export const TO_PAY_TYPE = 2;//待消费
export const AVAILABLE_TYPE = 3;//可使用
export const REFUND_TYPE = 4;//退款

export const getOrderById = (state, id) => {
    return state.entities.orders[id]
}

export const actionTypes = {
    DELETE_ORDER: 'ORDER/DELETE_ORDER',
    ADD_COMMENT: 'ORDER/ADD_COMMENT',
    ADD_ORDER: 'ORDER/ADD_ORDER'
}

let orderIdCounter = 10;

export const actions = {
    deleteOrder: (orderId) => ({
        type: actionTypes.DELETE_ORDER,
        orderId
    }),
    addComment: (orderId, commentId) => ({
        type: actionTypes.ADD_COMMENT,
        orderId,
        commentId
    }),
    addOrder: (order) => {
        const orderId = `o-${orderIdCounter++}`;
        return {
            type: actionTypes.ADD_ORDER,
            orderId,
            order: {...order, id: orderId}
        }
    }
}

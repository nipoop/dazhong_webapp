import url from '../../utils/url.js';
import {
    schema,
    TO_PAY_TYPE,
    AVAILABLE_TYPE,
    REFUND_TYPE,
    getOrderById,
    actions as orderActions,
    actionTypes as orderTypes,
} from './entities/orders.js';
import { actions as commentActions } from './entities/comments.js';
import { combineReducers } from 'redux';
import { FETCH_DATA } from '../middleware/api.js';

const typeToKey = {
    [TO_PAY_TYPE]: 'toPayIds',
    [AVAILABLE_TYPE]: 'availableIds',
    [REFUND_TYPE]: 'refundIds'
}
//1定义state
const initialState = {
    orders: {
        isFetching: false,
        ids: [],
        toPayIds: [],
        availableIds: [],
        refundIds: []
    },
    currentTab: 0,
    currentOrder: {
        id: null,
        isDeleting: false,//弹出删除提示框期间为true
        isCommenting: false,//编辑评论（打开评论框）时为true
        comment: '',
        stars: 0
    }
}
//2定义action
const actionTypes = {
    //获取订单列表
    FETCH_ORDERS_REQUEST: 'USER/FETCH_ORDERS_REQUEST',
    FETCH_ORDERS_SUCCESS: 'USER/FETCH_ORDERS_SUCCESS',
    FETCH_ORDERS_FAILURE: 'USER/FETCH_ORDERS_FAILURE',
    //设置当前选中的tab
    SET_CURRENT_TAB: 'USER/SET_CURRENT_TAB',
    //删除订单
    DELETE_ORDERS_REQUEST: 'USER/DELETE_ORDER_REQUEST',
    DELETE_ORDERS_SUCCESS: 'USER/DELETE_ORDER_SUCCESS',
    DELETE_ORDERS_FAILURE: 'USER/DELETE_ORDER_FAILURE',
    SHOW_DELETE_DIALOG: 'USER/SHOW_DELETE_DIALOG',
    HIDE_DELETE_DIALOG: 'USER/HIDE_DELETE_DIALOG',
    //评论订单
    SHOW_COMMENT_AREA: 'USER/SHOW_COMMENT_AREA',
    HIDE_COMMENT_AREA: 'USER/HIDE_COMMENT_AREA',
    SET_COMMENT: 'USER/SET_COMMENT',
    SET_STARS: 'USER/SET_STARS',
    //提交评论
    POST_COMMENT_REQUEST: 'USER/POST_COMMENT_REQUEST',
    POST_COMMENT_SUCCESS: 'USER/POST_COMMENT_SUCCESS',
    POST_COMMENT_FAILURE: 'USER/POST_COMMENT_FAILURE'
}


export const actions = {
    loadOrders: () => {
        return (dispatch, getState) => {
            const ids = getState().user.orders.ids;
            if (ids && ids.length > 0) {
                return null;
            }
            const endpoint = url.getOrders();
            return dispatch(fetchOrders(endpoint));
        }
    },
    setCurrentTab: index => ({
        type: actionTypes.SET_CURRENT_TAB,
        index
    }),
    //显示删除对话框
    showDeleteDialog: orderId => ({
        type: actionTypes.SHOW_DELETE_DIALOG,
        orderId
    }),
    removeOrders: () => {
        return (dispatch, getState) => {
            const { id } = getState().user.currentOrder;
            dispatch(deleteOrderRequest());
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    dispatch(deleteOrderSuccess(id));
                    dispatch(orderActions.deleteOrder(id));
                    resolve();
                },500)
            })
        }
    },
    hideDeleteDialog: () => ({
        type: actionTypes.HIDE_DELETE_DIALOG,
    }),
    //评论功能相关actionCreator
    showCommentArea: (orderId) => ({
        type: actionTypes.SHOW_COMMENT_AREA,
        orderId
    }),
    hideCommentArea: () => ({
        type: actionTypes.HIDE_COMMENT_AREA
    }),
    setComment: comment => ({
        type: actionTypes.SET_COMMENT,
        comment
    }),
    setStars: stars => ({
        type: actionTypes.SET_STARS,
        stars
    }),
    submitComment: () => {
        return (dispatch, getState) => {
            dispatch(postCommentRequest());
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const { id, stars, comment } = getState().user.currentOrder;
                    const commentObj = {
                        id: new Date(),
                        stars,
                        content: comment
                    }
                    dispatch(postCommentSuccess());
                    dispatch(commentActions.addComment(commentObj))
                    dispatch(orderActions.addComment(id, commentObj.id))
                    resolve();
                }, 500)
            });
        }
    }
}
const postCommentRequest = () => ({
    type: actionTypes.POST_COMMENT_REQUEST
})

const postCommentSuccess = () => ({
    type: actionTypes.POST_COMMENT_SUCCESS
})
const deleteOrderRequest = () => ({
    type: actionTypes.DELETE_ORDERS_REQUEST
})

const deleteOrderSuccess = id => ({
    type: actionTypes.DELETE_ORDERS_SUCCESS,
    orderId: id
})

const fetchOrders = endpoint => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_ORDERS_REQUEST,
            actionTypes.FETCH_ORDERS_SUCCESS,
            actionTypes.FETCH_ORDERS_FAILURE
        ],
        schema,
        endpoint
    }
})

//3定义reducer
const orders = (state = initialState.orders, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS_REQUEST:
            return { ...state, isFetching: true };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            const toPayIds = action.response.ids.filter(
                id => action.response.orders[id].type === TO_PAY_TYPE
            )
            const availabelIds = action.response.ids.filter(
                id => action.response.orders[id].type === AVAILABLE_TYPE
            )
            const refundIds = action.response.ids.filter(
                id => action.response.orders[id].type === REFUND_TYPE
            )
            return {
                ...state,
                isFetching: false,
                ids: state.ids.concat(action.response.ids),
                toPayIds: state.toPayIds.concat(toPayIds),
                availableIds: state.availableIds.concat(availabelIds),
                refundIds: state.refundIds.concat(refundIds)
            };
        case orderTypes.DELETE_ORDER:
        case actionTypes.DELETE_ORDERS_SUCCESS:
            return {
                ...state,
                ids: removeOrderId(state, 'ids', action.orderId),
                toPayIds: removeOrderId(state, 'toPayIds', action.orderId),
                availableIds: removeOrderId(state, 'availableIds', action.orderId),
                refundIds: removeOrderId(state, 'refundIds', action.orderId)
            }
        case orderTypes.ADD_ORDER:
            const key = typeToKey[action.order.type]
            console.log('key', key)
            console.log('state[key]', state[key])
            return {
                ids: state.ids.concat(action.order.id),
                [key]: state[key].concat(action.order.id)
            }
        default:
            return state;
    }
}
const removeOrderId = (state, key, id) => {
    return state[key].filter(item => {
        return item !== id;
    });
}

const currentOrder = (state = initialState.currentOrder, action) => {
    switch (action.type) {
        case actionTypes.SHOW_DELETE_DIALOG:
            return { ...state, isDeleting: true, id: action.orderId };
        case actionTypes.SHOW_COMMENT_AREA:
            return { ...state, isCommenting: true, id: action.orderId };
        case actionTypes.HIDE_DELETE_DIALOG:
        case actionTypes.DELETE_ORDERS_FAILURE:
        case actionTypes.DELETE_ORDERS_SUCCESS:
        case actionTypes.HIDE_COMMENT_AREA:
        case actionTypes.POST_COMMENT_SUCCESS:
        case actionTypes.POST_COMMENT_FAILURE:
            return { ...state, isDeleting: false, id: initialState.currentOrder };
        case actionTypes.SET_COMMENT:
            return { ...state, comment: action.comment };
        case actionTypes.SET_STARS:
            return { ...state, stars: action.stars };
        default:
            return state;
    }
}
const currentTab = (state = initialState.currentTab, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_TAB:
            return action.index;
        default:
            return state;
    }
}

const reducer = combineReducers({
    currentTab,
    orders,
    currentOrder
})
export default reducer;

export const getOrders = (state) => {
    const key = ['ids', 'toPayIds', 'availableIds', 'refundIds'][state.user.currentTab];
    return state.user.orders[key].map(id => {
        return getOrderById(state, id)
    })
}

export const getCurrentTab = (state) => {
    return state.user.currentTab;
}

export const getIsDeleting = (state) => {
    return state.user.currentOrder.isDeleting;
}

export const getCommentingOrderId = (state) => {
    return state.user.currentOrder ? state.user.currentOrder.id : 0;
}

export const getStars = (state) => {
    return state.user.currentOrder ? state.user.currentOrder.stars : 0;
}

export const getComment = (state) => {
    return state.user.currentOrder ? state.user.currentOrder.comment : '';
}

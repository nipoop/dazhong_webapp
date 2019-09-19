export const schema = {
    name: 'products',
    id: 'id'
}

const reducer = (state = {}, action) => {
    if (action.response && action.response[schema.name]) {
        return {
            ...state,
            ...action.response.products
        }
    }
    return state;
};

export const getProductById = (state, id) => {
    return state.entities.products[id]
}

export const getProductDetail = (state, id) => {
    const product = state.entities.products[id];
    return product && product.detail && product.purchaseNotes ? product :  null;
}

export default reducer;

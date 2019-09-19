
export const schema = {
    name: 'shops',
    id: 'id'
}

const reducer = (state = {}, action) => {
    if (action.response && action.response[schema.name]) {
        return {
            ...state,
            ...action.response.shops
        }
    }
    return state;
};

export const getShopById = (state, id) => {
    return state.entities.shops[id];
}


export default reducer;

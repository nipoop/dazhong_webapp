
export const schema = {
    name: 'keywords',
    id: 'id'
}


const reducer = (state = {}, action) => {
    if (action.response && action.response.keywords) {
        return {
            ...state,
            ...action.response.keywords
        };
    }
    return state;
}

export default reducer;

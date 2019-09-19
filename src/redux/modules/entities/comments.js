
export const schema = {
    name: "comments",
    id: 'id'
}
const reducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.ADD_COMMENT:
            return {
                ...state,
                [action.commentObj.id]: action.comment
            }
        default:
            return state;
    }
};

export default reducer;

const actionTypes = {
    ADD_COMMENT: 'COMMENTS/ADD_COMMENT'
}

export const actions = {
    addComment: (commentObj) => ({
        type: actionTypes.ADD_COMMENT,
        commentObj
    })
}

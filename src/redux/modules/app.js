//定义actionType

const types = {
    CLEAR_ERROR: 'APP/CLEAR_ERROR'
}

//定义action
export const actions = {
    clearError: () => ({
        type: types.CLEAR_ERROR
    })
}

const initialState = {
    error: null
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'APP/CLEAR_ERROR': {
            return {...state, error: null}
        }
        default:
            return state
    }
}

//定义selector
export const getError = (state) => {
    return state.app.error;
}
export default reducer;

//1.定义state
const initialState = {
    username: localStorage.getItem('username') || '',
    password: '',
    status: localStorage.getItem('isLogin') || false,
    isFetching: false
}
//2.定义action
const actionTypes = {
    LOGIN_REQUEST: 'LOGIN/LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN/LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN/LOGIN_FAILURE',
    LOGOUT: 'LOGIN/LOGOUT',
    SET_USERNAME: 'LOGIN/SET_USERNAME',
    SET_PASSWORD: 'LOGIN/SET_PASSWORD'
}

export const actions = {
    login: () => {
        return (dispatch, getState) => {
            const { username, password } = getState().login;
            if (!username || !password) {
                return dispatch(loginFailure('用户名和密码不能为空'));
            }
            dispatch(loginRequest());
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    dispatch(loginSuccess());
                    localStorage.setItem('username', username);
                    localStorage.setItem('isLogin', true);
                    resolve();
                }, 1000)
            })
        }
    },
    logout: () => {
        localStorage.removeItem('username');
        localStorage.removeItem('isLogin');
        return {
            type: actionTypes.LOGOUT
        }
    },
    setUsername: (username) => ({
        type: actionTypes.SET_USERNAME,
        username
    }),
    setPassword: (password) => ({
        type: actionTypes.SET_PASSWORD,
        password
    })
}

const loginRequest = () => ({
    type: actionTypes.LOGIN_REQUEST
})
const loginSuccess = () => ({
    type: actionTypes.LOGIN_SUCCESS
})

const loginFailure = () => ({
    type: actionTypes.LOGIN_FAILURE
})
//3.定义reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return { ...state, isFetching: true };
        case actionTypes.LOGIN_SUCCESS:
            return { ...state, isFetching: false, status: true };
        case actionTypes.LOGIN_FAILURE:
            return { ...state, isFetching: false };
        case actionTypes.LOGOUT:
            return { ...state, status: false, username: '' };
        case actionTypes.SET_USERNAME:
            return { ...state, username: action.username };
        case actionTypes.SET_PASSWORD:
            return { ...state, password: action.password };
        default:
            return state;
    }
}
export default reducer;

export const getUsername = (state) => {
    return state.login.username;
}
export const getPassword = (state) => {
    return state.login.password;
}
export const isLogin = (state) => {
    return state.login.status;
}

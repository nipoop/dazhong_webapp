import url from '../../utils/url.js';
import { FETCH_DATA } from "../middleware/api";
import { combineReducers } from 'redux';
import { schema as keywordSchema } from './entities/keywords.js';
import { schema as shopsSchema } from './entities/shops.js';


//1.定义state
const initialState = {
    //搜索框输入值
    inputText: '',
    //热门关键词
    popularKeywords: {
        isFetching: false,
        ids: []
    },
    //定义关联关键词
    relatedKeywords: {

    },
    //定义历史查询记录
    historyKeywords: [],

    //定义查询结果所需的商铺信息
    searchedShopsByKeyword: {

    }

}

//定义actionType
const actionTypes = {
    //获取热门关键词
    FETCH_POPULAR_KEYWORDS_REQUEST: 'SEARCH/FETCH_POPULAR_KEYWORDS_REQUEST',
    FETCH_POPULAR_KEYWORDS_SUCCESS: 'SEARCH/FETCH_POPULAR_KEYWORDS_SUCCESS',
    FETCH_POPULAR_KEYWORDS_FAILURE: 'SEARCH/FETCH_POPULAR_KEYWORDS_FAILURE',
    //获取相关关键词
    FETCH_RELATED_KEYWORDS_REQUEST: 'SEARCH/FETCH_RELATED_KEYWORDS_REQUEST',
    FETCH_RELATED_KEYWORDS_SUCCESS: 'SEARCH/FETCH_RELATED_KEYWORDS_SUCCESS',
    FETCH_RELATED_KEYWORDS_FAILURE: 'SEARCH/FETCH_RELATED_KEYWORDS_FAILURE',
    //或许关键词查询到的相关店铺
    FETCH_RELATED_SHOPS_REQUEST: 'SEARCH/FETCH_RELATED_SHOPS_REQUEST',
    FETCH_RELATED_SHOPS_SUCCESS: 'SEARCH/FETCH_RELATED_SHOPS_SUCCESS',
    FETCH_RELATED_SHOPS_FAILURE: 'SEARCH/FETCH_RELATED_SHOPS_FAILURE',
    //设置搜索框输入值
    SET_INPUT_TEXT: 'SEARCH/SET_INPUT_TEXT',
    //清空搜索框输入值
    CLEAR_INPUT_TEXT: 'SEARCH/CLEAR_INPUT_TEXT',
    //添加历史查询记录
    ADD_HISTORY_KEYWORD: 'SEARCH/ADD_HISTORY_KEYWORD',
    //清空历史查询记录
    CLEAR_HISTORY_KEYWORDS: 'SEARCH/CLEAR_HISTORY_KEYWORDS'
}

//定义action
export const actions = {
    loadPopularKeywords: () => {
        return (dispatch, getState) => {
            const popularKeywords = getState().search.popularKeywords.ids;
            if (popularKeywords.length > 0) {
                return null;
            }
            const endpoint = url.getPopularKeywords();
            return dispatch(fetchPopularKeywords(endpoint));
        }
    },

    loadRelatedKeywords: (text) => {
        return (dispatch, getState) => {
            const relatedKeyword = getState().search.relatedKeywords[text];
            if (relatedKeyword && relatedKeyword.ids.length > 0) {
                return null;
            }
            const endpoint = url.getRelatedKeywords(text);
            return dispatch(fetchRelatedKeywords(endpoint, text));
        }
    },

    setInputText: (text) => ({
        type: actionTypes.SET_INPUT_TEXT,
        text: text
    }),

    clearInputText: () => ({
        type: actionTypes.CLEAR_INPUT_TEXT,
    }),

    addHistoryKeyword: (id) => ({
        type: actionTypes.ADD_HISTORY_KEYWORD,
        id
    }),

    clearHistoryKeywords: () => ({
        type: actionTypes.CLEAR_HISTORY_KEYWORDS
    }),

    loadRelatedShops: (text) => {
        return (dispatch, getState) => {
            const searchedShopsByKeyword = getState().search.searchedShopsByKeyword;
            if (searchedShopsByKeyword[text]) {
                return null;
            }
            const endpoint = url.getSearchedShops(text);
            return dispatch(fetchRelatedShops(endpoint, text));
        }
    }
}

const fetchRelatedShops = (endpoint, text) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_RELATED_SHOPS_REQUEST,
            actionTypes.FETCH_RELATED_SHOPS_SUCCESS,
            actionTypes.FETCH_RELATED_SHOPS_FAILURE
        ],
        endpoint,
        schema: shopsSchema
    },
    text
})

const fetchPopularKeywords = (endpoint) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_POPULAR_KEYWORDS_REQUEST,
            actionTypes.FETCH_POPULAR_KEYWORDS_SUCCESS,
            actionTypes.FETCH_POPULAR_KEYWORDS_FAILURE
        ],
        endpoint,
        schema: keywordSchema
    }
})

const fetchRelatedKeywords = (endpoint, text) => ({
    [FETCH_DATA]: {
        types: [
            actionTypes.FETCH_RELATED_KEYWORDS_REQUEST,
            actionTypes.FETCH_RELATED_KEYWORDS_SUCCESS,
            actionTypes.FETCH_RELATED_KEYWORDS_FAILURE
        ],
        endpoint,
        schema: keywordSchema
    },
    text
})

//定义reducer
const searchedShopsByKeyword = (state = initialState.searchedShopsByKeyword, action) => {
    switch (action.type) {
        case actionTypes.FETCH_RELATED_SHOPS_REQUEST:
        case actionTypes.FETCH_RELATED_SHOPS_SUCCESS:
        case actionTypes.FETCH_RELATED_SHOPS_FAILURE:
            return {
                ...state,
                [action.text]: searchedShops(state[action.text], action)
            };
        default:
            return state;
    }
}
const searchedShops = (state = { isFetching: false, ids: [] }, action) => {
    console.log('action', action)
    switch (action.type) {
        case actionTypes.FETCH_RELATED_SHOPS_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.FETCH_RELATED_SHOPS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                ids: action.response.ids
            };
        case actionTypes.FETCH_RELATED_SHOPS_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        default:
            return state;
    }
}


const popularKeywords = (state = initialState.popularKeywords, action) => {
    switch (action.type) {
        case actionTypes.FETCH_POPULAR_KEYWORDS_REQUEST:
            return { ...state, isFetching: true };
        case actionTypes.FETCH_POPULAR_KEYWORDS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                ids: action.response.ids
            };
        case actionTypes.FETCH_POPULAR_KEYWORDS_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        default:
            return state;
    }
}

const relatedKeywords = (state = initialState.relatedKeywords, action) => {
    switch (action.type) {
        case actionTypes.FETCH_RELATED_KEYWORDS_REQUEST:
        case actionTypes.FETCH_RELATED_KEYWORDS_SUCCESS:
        case actionTypes.FETCH_RELATED_KEYWORDS_FAILURE:
            return {
                ...state,
                [action.text]: relatedKeywordsByText(state[action.text], action)
            };
        default:
            return state;
    }
}

const relatedKeywordsByText = (state = { isFetching: true, ids: [] }, action) => {
    switch (action.type) {
        case actionTypes.FETCH_RELATED_KEYWORDS_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.FETCH_RELATED_KEYWORDS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                ids: action.response.ids
            };
        case actionTypes.FETCH_RELATED_KEYWORDS_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        default:
            return state;
    }
}

const inputText = (state = initialState.inputText, action) => {
    switch (action.type) {
        case actionTypes.SET_INPUT_TEXT:
            return action.text;
        case actionTypes.CLEAR_INPUT_TEXT:
            return '';
        default:
            return state;
    }
}

const historyKeywords = ( state = initialState.historyKeywords, action ) => {
    switch (action.type) {
        case actionTypes.ADD_HISTORY_KEYWORD:
            const data = state.filter(item => {
                if (action.id !== item) {
                    return true;
                }
                return false;
            })
            return [action.id, ...data];
        case actionTypes.CLEAR_HISTORY_KEYWORDS:
            return [];
        default:
            return state;
    }
}

const reducer = combineReducers({
    popularKeywords,
    relatedKeywords,
    inputText,
    historyKeywords,
    searchedShopsByKeyword
})

export default reducer;


//定义selector
export const getInputText = (state) => {
    return state.search.inputText;
}

export const getPopularKeywords = (state) => {
    return state.search.popularKeywords.ids.map(id => {
        return state.entities.keywords[id];
    });
}

export const getRelatedKeywords = state => {
    const text = state.search.inputText;
    if(!text || text.trim().length === 0) {
      return [];
    }
    const relatedKeyword = state.search.relatedKeywords[text];
    if (!relatedKeyword) {
        return []
    }
    return relatedKeyword.ids.map(id => {
        return state.entities.keywords[id];
    });
}

export const getHistoryKeywords = (state) => {
    return state.search.historyKeywords.map(id => {
        return state.entities.keywords[id];
    })
}

export const getSearchedShops = state => {
  const keywordId = state.search.historyKeywords[0];
  if(!keywordId) {
    return [];
  }
  const shops = state.search.searchedShopsByKeyword[keywordId];
  return shops.ids.map(id => {
    return state.entities.shops[id];
  })
}

export const getCurrentKeyword = (state) => {
    const id = state.search.historyKeywords[0];
    if (!id) {
        return ''
    }
    return state.entities.keywords[id];
}

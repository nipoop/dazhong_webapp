import { get } from '../../utils/request.js';

export const FETCH_DATA = 'FETCH_DATA';

export default store => next => action => {
    if (action[FETCH_DATA] === undefined) {
        return next(action);
    }

    const { types, schema, endpoint } = action[FETCH_DATA];
    if (typeof endpoint !== 'string' ) {
        throw new Error('endpoint必须为字符串类型的URL');
    }
    if (!schema) {
        throw new Error('必须指定schema');
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('必须指定数组types且长度为3');
    }
    if(!types.every(type => typeof type === 'string')) {
      throw new Error('action type必须为字符串类型');
    }

    const actionWith = (data) => {
        const finalAction = {...action, ...data}
        delete finalAction[FETCH_DATA]
        return finalAction
    }

    const [ request, success, failure ] = types;
    console.log('dispatch request')
    next(actionWith({type: request}));
    return fetchData(endpoint, schema).then(response => {
        console.log('dispatch success')
        next(actionWith({
            type: success,
            response
        }))
    }).catch(error => {
        next(actionWith({
            type: failure,
            error: error.message || '获取数据失败'
        }))
    })
}

const fetchData = (endpoint, schema) => {
    return get(endpoint).then(data => {
        return normalize(data, schema);
    });
};

const normalize = (data, schema) => {
    const { id, name } = schema;
    let ids = [];
    let kvObj = {};
    if (Array.isArray(data)) {
        data.forEach(item => {
            ids.push(item[id]);
            kvObj[item[id]] = item;
        })
    } else {
        ids.push(data[id]);
        kvObj[data[id]] = data;
    }
    return {
        [name]: kvObj,
        ids
    }
}


const headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
});
export const get = (url) => {
    return fetch(url, {
        method: 'get',
        headers: headers
    }).then(response => {
        return handleResponse(url, response);
    }).catch(error => {
        console.log(`request fail in reach ${url} + ${error}`);
        return Promise.reject({error: {message: 'request failed'}});
    })
};

export const post = (url, data) => {
    fetch(url, {
        method: 'post',
        headers: headers,
        body: data
    }).then(response => {
        return handleResponse(url, response);
    }).catch(error => {
        console.log(`request fail in reach ${url} + ${error}`);
        return Promise.reject({error: {message: 'request failed'}});
    })
};

const handleResponse = (url, response) => {
    if (response.status === 200) {
        return response.json();
    }
    console.log(`fail getting data ${url}`);
    return Promise.reject({error: {message: 'request failed'}});
}

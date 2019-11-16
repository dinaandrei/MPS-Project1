const postData = (url = '', data = {}) => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(res => console.log({res}));
}

const getData = (url = '') => {
    fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(res => console.log({res}));
}

export {postData, getData};
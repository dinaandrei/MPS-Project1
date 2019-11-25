const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        try{
            return await response.json();
        } catch {
            return response;
        }
    } else {
        return response;
    }

}

const getData = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        try{
            return await response.json();
        } catch {
            return response;
        }
    } else {
        return response;
    }
}

const deleteData = async (url = '') => {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        try{
            return await response.json();
        } catch {
            return response;
        }
    } else {
        return response;
    }
}

export { postData, getData, deleteData };
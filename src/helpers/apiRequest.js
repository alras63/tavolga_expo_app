import * as SecureStore from 'expo-secure-store';
export const postData = async function(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(data)
    });
    return await response.json();
}


export const gettingData = async function(url = '') {
    let token = await SecureStore.getItemAsync('secure_token');

    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer', 
    });
    return await response.json();
}


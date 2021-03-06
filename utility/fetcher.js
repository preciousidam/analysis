import {backend} from '../url';


const headers = {
    'content-type': 'application/json',
    'Accept': 'application/json',
}

export const getData = async (...args) => {
    
    const res = await fetch(...args,{
        method: 'GET',
    });
    const json = await res.json();
    const {data} = await json;
    
    return data;
}


export const delData = async (url,id,token) => {
    
    const res = await fetch(`${backend}/api/${url}`,{
        method: 'POST',
        headers: {...headers, Authorization: `Bearer ${token}`},
        body: JSON.stringify({id})
    });
    const json = await res.json();

    return json;
}


export const setData = async (id,body,token) => {
    const res = await fetch(`${backend}/api/${id}`,{
        method: 'POST',
        headers: {...headers, Authorization: `Bearer ${token}`},
        body: JSON.stringify(body)
    });
    const json = await res.json();

    return json;
}

export const refreshToken = async (refresh_token) => {
    
    const res = await fetch(`${backend}/api/auth/refresh`,{
        method: 'POST',
        headers: {...headers, Authorization: `Bearer ${refresh_token}`},
        body: JSON.stringify({token})
    });
    const json = await res.json();
    const {token} = await json;
    
    return token;
}

export const changePassword = async (body,token) => {
    
    const res = await fetch(`${backend}/api/auth/request-password-reset`,{
        method: 'POST',
        headers: {...headers, Authorization: `Bearer ${token}`},
        body: JSON.stringify(body)
    });
    const json = await res.json();
    
    return json;
}

export const forgotPassword = async (body) => {
    
    const res = await fetch(`${backend}/api/auth/forgot-password`,{
        method: 'POST',
        headers: {...headers},
        body: JSON.stringify(body)
    });
    const json = await res.json();
    
    return json;
}

export const resetPassword = async (body, token) => {
    
    const res = await fetch(`${backend}/api/auth/forgot-password/${token}`,{
        method: 'POST',
        headers: {...headers},
        body: JSON.stringify(body)
    });
    const json = await res.json();
    
    return json;
}
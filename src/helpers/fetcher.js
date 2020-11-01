import {baseURL} from '../constants'

function updateOptions(options){

    const update = {...options}
       update.headers = {
           ...update.headers,
           'Cache-Control': 'no-cache',
           'Access-Control-Allow-Origin': '*',
           'Content-Type': 'application/json'
       } 
    if(localStorage.token){
        update.headers ={
            ...update.headers,
            Authorization: localStorage.token
        };
    }
    return update;
}

export default async function fetcher(url,options){
    return await fetch(baseURL + url,updateOptions(options))
}
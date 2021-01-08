import {getToken} from '../utils/common';
import axios from 'axios';
let URL='http://localhost:8000'
export const getALLPOs = async()=>{
    let bearer_token = getToken();
    //let bearer_token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJEZWJhYnJhdCBQYW5kYSIsInVzZXJJZCI6IjE4NTU5NiIsInJvbGVzIjpbIlVTRVIiLCJERUxJVkVSWSIsIlJFU09VUkNJTkciLCJSRUNSVUlUTUVOVCIsIkFDQ09VTlRTIiwiUERTX0VNQUlMIiwiQURNSU5JU1RSQVRPUiIsIkZPUkVDQVNUX0NPTlRSSUJVVE9SIiwiRk9SRUNBU1RfQURNSU5JU1RSQVRPUiJdLCJleHAiOjE2MTAwMzA4OTJ9.890JvNp-YtCux2uIy8NuXH0o237SchTKNSw2foKURUxyKqKOXNFIp0TZ83WUkyGbepNzJCR8A5Jxqp-vsog_aw';
    let bearer = 'Bearer ' + bearer_token;
    console.log(bearer);
    const response = await axios.get(`${URL}/api/datas`,{
        headers:{
            'Authorization':bearer
        }
    });
    return await response.data;
}

export const uploadFile = async(data)=>{
    const response = await fetch(`${URL}/api/upload`,{
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({file: data})
    });
    return await response.json();
    // const response = wait fetch('')
}

export const userValidate = async (user)=>{
    const response = await axios.get(`${URL}/api/login`,{
        headers: {'username':user.userId,
                 'password':user.password,
                 'Access-Control-Allow-Origin':'*',
                 'Content-Type':'application/json'
        }
   });
    return await response.data;
}
import {getToken} from '../utils/common';
export const getALLPOs = async()=>{
    let bearer_token = getToken();
    //let bearer_token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJEZWJhYnJhdCBQYW5kYSIsInVzZXJJZCI6IjE4NTU5NiIsInJvbGVzIjpbIlVTRVIiLCJERUxJVkVSWSIsIlJFU09VUkNJTkciLCJSRUNSVUlUTUVOVCIsIkFDQ09VTlRTIiwiUERTX0VNQUlMIiwiQURNSU5JU1RSQVRPUiIsIkZPUkVDQVNUX0NPTlRSSUJVVE9SIiwiRk9SRUNBU1RfQURNSU5JU1RSQVRPUiJdLCJleHAiOjE2MDg3MzA5MDd9.b8jCqLpMSAuOV34bSJMfOaaQEFDVKMX-IxajNl3eDfcWHnZVLCM2Antel-Mqh102Z67rQqqKZmvKOKiV4ep-Cw';
    let bearer = 'Bearer ' + bearer_token;
    console.log(bearer);
    const response = await fetch('http://localhost:8000/api/datas',{
        method:'get',
        headers:{
            'Authorization':bearer
        }
    });
    return await response.json();
}

export const uploadFile = async(data)=>{
    const response = await fetch('http://localhost:8000/api/upload',{
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({file: data})
    });
    return await response.json();
    // const response = wait fetch('')
}

export const userValidate = async (user)=>{
    const response = await fetch('http://localhost:8000/api/login',{
        method:'get',
        headers: {'username':user.userId,
                 'password':user.password,
                 'Access-Control-Allow-Origin':'*',
                 'Content-Type':'application/json'
        }
   });
    return await response.json()
}
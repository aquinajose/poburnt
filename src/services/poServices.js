import {getToken} from '../utils/common';
export const getALLPOs = async()=>{
    let bearer_token = getToken();
    //let bearer_token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJEZWJhYnJhdCBQYW5kYSIsInVzZXJJZCI6IjE4NTU5NiIsInJvbGVzIjpbIlVTRVIiLCJERUxJVkVSWSIsIlJFU09VUkNJTkciLCJSRUNSVUlUTUVOVCIsIkFDQ09VTlRTIiwiUERTX0VNQUlMIiwiQURNSU5JU1RSQVRPUiIsIkZPUkVDQVNUX0NPTlRSSUJVVE9SIiwiRk9SRUNBU1RfQURNSU5JU1RSQVRPUiJdLCJleHAiOjE2MDg2OTc2NDR9.me-x3M0HCzejXRVme4LCHVh2M17RC3VR_fAnejr-1yJ9aIaBCif1lo-yU-O56I6T4fDuHd7ntdRPQmwkvmxogA';
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
    console.log(user.userId);
    console.log(user.password);
    const response = await fetch('http://localhost:8000/api/login',{
        method:'get',
        headers: {'username':user.userId,
                 'password':user.password
        }
   });
    return await response.json()
}
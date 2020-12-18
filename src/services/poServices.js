export const getALLPOs = async()=>{
    const response = await fetch('http://localhost:8000/api/datas');
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
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user})
    });
    return await response.json()
}
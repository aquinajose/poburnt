export const gerUser =()=>{
    const userStr = localStorage.getItem('user');
    if(userStr){
        JSON.parse(userStr)
    }else return null;
};

// remove the token and user from the session storage
export const removeUserSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

export const getToken =()=>{
    return localStorage.getItem('token')||null;
}

export const setUserSession =(token,user)=>{
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user))
}
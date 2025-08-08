export const setAuth=(data) => {
    localStorage.setItem("user", JSON.stringify(data));
}

export const getAuth=() => {
    if(localStorage.getItem("user")){
        return JSON.parse(localStorage.getItem("user"));
    }
}
export const deleteAuth=() => {
    if(localStorage.getItem("user")){
        localStorage.removeItem("user");
    }
}
// is Loggedin
export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
  if (data != null) return true;
  else return false;
};

// do login => data set to local storage
export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

// do logout => remove from local storage
export const doLogout = (next) => {
    localStorage.removeItem("data");
    next();
}

// get current user
export const getCurrentUserDetails = () => {
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data"))?.user;
    } else {
        return undefined;
    }
}

export const getToken = () => {
  if(isLoggedIn){
    return JSON.parse(localStorage.getItem("data")).token;
  }else{
    return null;
  }
}
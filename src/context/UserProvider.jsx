import React, { useEffect, useState } from "react";
import userContext from "./userContext";
import { getCurrentUserDetails, isLoggedIn } from "../auth";

function UserProvider ({children}){

    const [user, setUser] = useState({
        data : {},
        login : false
    })

    useEffect(()=>{
        setUser({
            data: getCurrentUserDetails(),
            login: isLoggedIn()
        })
    }, [])

    return (

        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider;
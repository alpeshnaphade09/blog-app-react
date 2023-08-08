import React, { useEffect, useState } from "react";
import userContext from "./userContext";

function UserProvider ({children}){

    const [user, setUser] = useState({
        name:'Alpesh'
    })

    useEffect(()=>{
        setUser({
            name : "Alpesh Naphade"
        })
    },[])

    return (

        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider;
import React, { useState } from 'react'
import axios from 'axios';
import { LoginContext } from './LoginContext'
function UserLogin({ children }) {
  
    let [currentUserStatus, setCurrentUserStatus] = useState(false);
    let [loggedInUser, setLoggedInUser] = useState({})
    let [loginErr, setLoginErr] = useState("");
    const loginUser = (userCredObj) => {
        axios.post('http://localhost:3500/user-api/signin', userCredObj)
            .then(res => {
                console.log(res)
                if (res.data.message === "success") {
                    setLoggedInUser({ ...res.data.user })
                    setLoginErr("")
                    setCurrentUserStatus(true)
                    localStorage.setItem("token", res.data.token)
                }
                else {
                    setLoginErr(res.data.message)
                }

            })
            .catch(err => setLoginErr(err.message))
    }
    const logoutuser=()=>{
        setCurrentUserStatus(false)
        localStorage.clear();
    }
    return (
        <LoginContext.Provider value={[currentUserStatus, loggedInUser, loginUser, loginErr,logoutuser]}>
            {children}
        </LoginContext.Provider>
    )
}

export default UserLogin
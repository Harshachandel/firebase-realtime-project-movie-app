import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import {auth} from '../firebase'
import { Navigate, Outlet } from 'react-router-dom'

// import {loginForm} from './loginForm'

const PrivateRouter = () => {

    const [isAuth , setAuth] = useState(undefined)

    function getAuthfun(){
        onAuthStateChanged(auth,(user)=>{
            console.log("user from PrivateRouter : ",user)
            setAuth(user)
        })
    }

    useEffect(()=>{
        getAuthfun()
    },[])

    if(isAuth === undefined){
        return <h1>Loading...</h1>
    }

  return isAuth ? <Outlet/> : <Navigate to="/LoginForm"/>

}

export default PrivateRouter


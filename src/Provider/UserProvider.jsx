import {onAuthStateChanged} from "firebase/auth"
import { useEffect,useState } from "react"
import {auth} from "../firebase"
import {UserContext} from "../context/user"

export default function UserProvider({children}){


    const [user,setUser]=useState(null)
    

    useEffect(()=>{

        onAuthStateChanged(auth,(user)=>{

            console.log(user != null ? "Logueado": "No logueado")
            setUser(user)
        })

    },[])

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
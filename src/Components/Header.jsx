import { useState,useEffect } from 'react'
import styles from "../CSS/Header.module.css"
import { useNavigate ,Link} from "react-router-dom";
  


function Header({user}) {
    const navigate = useNavigate();
    const HandleClick=()=>{


    }



  return (
    <header className={styles.Header}>
   
    {   user ? 
    
    
    (
        <div style={{display:"flex", flexDirection:"row", gap:"1rem"}}>
        <Link to={"/SignIn"}>Sign</Link>
        <Link to={"/Login"}>LogIn</Link>
        <Link to={"/PefilUsuario"}>Perfil</Link>
        </div>


        
        
    )

    :

    (
        <div style={{display:"flex", flexDirection:"row", gap:"1rem"}}>
        <Link to={"/SignIn"}>Sign</Link>
        <Link to={"/Login"}>LogIn</Link>
        </div>
        
        
        )





    }
 


    </header>
  )
}

export default Header

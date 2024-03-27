import { useState,useEffect } from 'react'
import styles from "../CSS/Header.module.css"
import { useNavigate ,Link} from "react-router-dom";
  


function Header({user}) {
    const navigate = useNavigate();
    const HandleClick=()=>{


    }



  return (
    <header className={styles.header}>
   
    {   user ? 
    
    
    (
        <div style={{display:"flex", flexDirection:"row", gap:"1rem"}}>
          <Link to={"/"} className={styles.text}>Inicio</Link>
          <Link to={"/SignIn"} className={styles.text}>Sign</Link>
          <Link to={"/Login"} className={styles.text}>LogIn</Link>
          <Link to={"/Search"} className={styles.text}>🔎</Link>
          <Link to={"/PefilUsuario"} className={styles.text}>Perfil</Link>
        </div>
    )

    :

    (
        <div style={{display:"flex", flexDirection:"row", gap:"1rem"}}>
          <Link to={"/"} className={styles.text}>Inicio</Link>
          <Link to={"/SignIn"} className={styles.text}>Sign</Link>
          <Link to={"/Login"} className={styles.text}>LogIn</Link>
          <Link to={"/Search"} className={styles.text}>🔎</Link>
        </div>
        )





    }
 


    </header>
  )
}

export default Header

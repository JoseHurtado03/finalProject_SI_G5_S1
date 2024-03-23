import { useState,useEffect } from 'react'
import styles from "../CSS/Comentario.module.css"
import { useNavigate } from "react-router-dom";
  


function Comment({nombre,comentario}) {
    const navigate = useNavigate();
    const HandleClick=()=>{


        navigate(`/GroupPage/${nombre}`);

    }



  return (
    <div className={styles.comment} onClick={HandleClick}>
   
    <h2>{nombre}</h2>
    <div>{comentario} </div>
 


    </div>
  )
}

export default Comment

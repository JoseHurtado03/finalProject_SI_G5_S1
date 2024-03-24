import React from 'react'
//import { useState } from 'react'
import styles from '../CSS/PerfilUsuario.module.css'
import { useUser } from "../context/user";
import { useState,useEffect } from 'react'
import {getUsuario} from "../Controllers/usuario"
import QuitGroup from '../Components/QuitGroup';

export default function PerfilUsuario() {
  const user = useUser();
  

  const [Nombre,setNombre]= useState("")
  const [Apellido,setApellido]= useState("")
  const [email,setEmail]= useState("")
  const [grupos,setGrupos]=useState()

  useEffect(()=>{
    if(user){

        const uwu=async ()=>{
            console.log("Aparecio")
            
            const usuario= await getUsuario(user.email)
            
           
            setNombre(usuario.Nombre)
            setApellido(usuario.Apellido)
            setEmail(user.email)
            setGrupos(usuario.subscripciones)
            

        }
        
        uwu()
    }

}

    ,[user])






    return (
      <div className={styles.container}>
        <section className={styles.section}>
          <img className={styles.imagen} src="https://banner2.cleanpng.com/20180331/khw/kisspng-computer-icons-user-clip-art-user-5abf13d4b67e20.4808850915224718927475.jpg" alt="Imagen de usuario" />
          <h2>{Nombre} {Apellido}</h2>
          <h1 className={styles.ubicacion}>[Ubicación de Usuario]</h1>
          <div className={styles.bordes}></div>
          <section/>
        </section>
        <section className={styles.section}>
          <section>
            <h2>Telefono</h2>
            <h2>[Telefono del usuario]</h2>
            <button>Editar</button>
          </section>
          <section>
            <h2>Correo</h2>
            <h2>{email}</h2>
            
          </section>
          <section>
            <h2>Pais</h2>
            <h2>[Pais del usuario]</h2>
            <button>Editar</button>
          </section>
          <section>
            <h2>Afiliciones</h2>

            
            {grupos ? (
                                
                grupos.map((propa) => (
                
                <QuitGroup key={propa} id={propa} grupos={propa}></QuitGroup>
                                                    
                                                    
                ))
                                                
                
                ): ("Cargando")}


           


          </section>
        </section>
      </div>
    );
  }
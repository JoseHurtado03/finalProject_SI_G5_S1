
import React from 'react'
//import { useState } from 'react'
import styles from '../CSS/PerfilUsuario.module.css'
import { useUserContext } from "../context/user";
import { useState,useEffect } from 'react'
import {cambiarInfoUsuario} from "../Controllers/usuario"
import QuitGroup from '../Components/QuitGroup';
import {uploadImage,getImage} from "../Controllers/files"
import { useNavigate } from 'react-router-dom';

export default function PerfilUsuario() {
  const {user, userData} = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (userData) {
      if (userData.role == "admin") {
        navigate("/Admin");
      }}}, [userData, navigate]);
      useEffect(() => {
        if (!userData) {
            navigate("/");
          }}, [userData, navigate]);

  const [Nombre,setNombre]= useState("")
  const [Apellido,setApellido]= useState("")
  const [email,setEmail]= useState("")
  const [password,setPassword]= useState("")
  const [grupos,setGrupos]=useState()
  const [imagen,setImagen]=useState(null)

  const handleImagen=async (evento,email)=>{
    await uploadImage(evento,email)

    const img =await getImage(email)
    window.location.reload();
    setImagen(img)


  }

  useEffect(()=>{
    if(userData){

        const uwu=async ()=>{
            
            
           
            setNombre(userData.Nombre)
            setApellido(userData.Apellido)
            setEmail(userData.email)
            setPassword(userData.password)
            setGrupos(userData.subscripciones)

            const img =await getImage(userData.email)
            if(img!=null){
              setImagen(img)
            }
            
            

        }
        
        uwu()
    }

},[userData])





     return ( userData ? (
      <div className={styles.container}>
        <section className={styles.section}>
          
          {imagen ? (<img className={styles.imagen} src={imagen} alt="Imagen de usuario" />):(<img className={styles.imagen} src="https://banner2.cleanpng.com/20180331/khw/kisspng-computer-icons-user-clip-art-user-5abf13d4b67e20.4808850915224718927475.jpg" alt="Imagen de usuario"></img>)}
          
          <input type='file' name='' onChange={e=>handleImagen(e.target.files[0],userData.email)
           
            
          }></input>
          {/* <h2>{Nombre} {Apellido}</h2> */}
          <h1 className={styles.ubicacion}>[Ubicación de Usuario]</h1>
          <div className={styles.bordes}></div>
          <section/>
        </section>
        <section className={styles.section}>
        <section>
            <h2>Telefono</h2>
            <h2>[Telefono del usuario]</h2>
          </section>
          <section>
            <h2>Nombre</h2>
            <input value={Nombre} onChange={e =>  setNombre(e.target.value) }></input>
            
          </section>
          
          <section>
            <h2>Apellido</h2>
            <input value={Apellido} onChange={e =>  setApellido(e.target.value) }></input>
            
          </section>
          <section>
            <h2>Correo</h2>
            <h2>{email}</h2>
            
          </section>
          <section>
            <h2>PassWord</h2>
            <h2>{password}</h2>
            
          </section>
          <section>
            <h2>Pais</h2>
            <h2>[Pais del usuario]</h2>
            
          </section>
          <button onClick={()=>{cambiarInfoUsuario(user.uid,Nombre,Apellido)}}>Editar</button>
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
    ) :("Cargando...")
    );
  }
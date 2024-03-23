import { useEffect, useState } from "react"
import {createUserWithEmail,SingInwithEmail,singInGoogle,singOut} from "../Controllers/auth"
import {useUser} from "../context/user"
import { useNavigate,Link } from "react-router-dom"

import {createUser,buscarUsuarioPorId} from "../Controllers/usuario"


export default function Login(){
    const navigate= useNavigate()
    const user= useUser()

    function separarNombreApellido(nombreCompleto) {
        
        const partes = nombreCompleto.split(' '); // Divide la cadena en un array de substrings separados por espacios
        const nombre = partes[0]; // El primer elemento es el nombre
        const apellido = partes.slice(1).join(' '); // Los elementos restantes son el apellido
        return { nombre, apellido };
      }


 


    useEffect(()=>{
        
        if(user){
            
            const comprove= async (id)=>{

                const nuevo= await buscarUsuarioPorId(id)

                if(nuevo){
                    console.log("es nuebo")
                    //activar despues
                    navigate("/")
                }else{
                    
                    const NombreApellido=separarNombreApellido(user.displayName)
          
            
                         const crear=async ()=>{await createUser(NombreApellido.nombre,NombreApellido.apellido,"username",user.email,"password",)}
                                  
                    crear()
          
                    //activar despues
                    navigate("/")
                    
                }

            }
            comprove(user.email)
            // navigate("/AppPage")

            
        }

    }

    ,[user,navigate])



    
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
   

    const handleLogin= async (e)=> {
        const user = await SingInwithEmail(email,password)

        
      
        
    }


    const handleLogingGoogle= async (e)=> {
        const user = await singInGoogle()
        console.log(user)
        

    }

    const handleBack= ()=>{
        navigate("/")
    }
    



    return (
    <div >

        <h1 >Email</h1>
        <input value={email} onChange={e =>  setEmail(e.target.value) }></input>
        <h1 >Password</h1>
        <input value={password} onChange={e =>  setPassword(e.target.value) }></input>
        <button  onClick={ handleLogin}>LOGIN</button>
        <button  onClick={handleLogingGoogle}>GOOGLE</button>
        <button  onClick={handleBack}>Regresar</button> 
        

    </div>)
}
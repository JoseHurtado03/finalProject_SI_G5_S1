import {buscarUsuario,getUsuario,cambiarGrupo} from "../Controllers/usuario"

import {useUser} from "../context/user"

import { useEffect, useState } from "react"
import styles from "../CSS/GroupCard.module.css"

import {buscarGrupo,quitarPersonaGrupo} from "../Controllers/Groups"


export default function QuitGroup(id){
    
    const [grupo,setGrupo]= useState(null)
    const [grupoP,setGrupoP]= useState(null)
    const currentuser=useUser()
    const [visible,setVisible] = useState(true) //Este state es para que muestre o no el boton de quit group al igual que el titulo del grupo. 
    
    const handleUnsubscribe = () => {
        
        console.log(id.id)
        
        
        cambiarGrupo(currentuser.email, id);
        quitarPersonaGrupo(currentuser.email, id.id)
    
        setVisible(false);
      };


    useEffect( ()=>{


        async function load(){
            //objeto
            const grupo=  await buscarGrupo(id.id)
            setGrupo(grupo)
            console.log(grupo)
        }
        load()
    },[])


    useEffect(()=>{
        if(currentuser){

            const uwu=async ()=>{
                
                
                const usuario= await getUsuario(currentuser.email)
                
                setGrupoP(usuario.subscripciones)

            }
            
            uwu()
        }

    }

    ,[currentuser])


    return (


     <div>

        {visible ? ( <div className={styles.carta} >
        {/* <div>{id}</div> */}
        
            {grupo ? (
            <div>

<h1>{id.id}</h1>

       

        
<button onClick={handleUnsubscribe} >UNSUBSCRIBE</button>
            </div>
            

):("")}
            
        
          

    </div>):("")}

     </div>


   )

}
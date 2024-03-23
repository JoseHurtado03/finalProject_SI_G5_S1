import {useEffect, useState} from "react"
import {buscarGrupo} from "../Controllers/Groups"

export default function useGrupo(id){
    const [grupo,setGrupo]= useState(null)

    
    useEffect(()=>{
        const descargar=async ()=>{
            const group=await buscarGrupo(id) 
            setGrupo(group)
        }

        descargar()
    }
    ,[])

    return grupo;
}
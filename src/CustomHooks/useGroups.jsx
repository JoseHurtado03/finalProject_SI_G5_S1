import {useEffect, useState    } from "react"
import {getGrupos} from "../Controllers/Groups"


export default function useGrupos(){
    const [grupos,setGrupos]= useState(null)

    useEffect( ()=>{


        async function load(){
            const grupos=  await getGrupos()
            setGrupos(grupos)
            
        }
        load()
    },[])

    return grupos;
}
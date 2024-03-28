import useGrupos from '../CustomHooks/useGroups'
import EliminarGrupo from '../Components/TarjetaEliminarGrupo'; 
import { useState } from 'react';
import { createGroup } from '../Controllers/Groups';

export default function Admin() {

    const grupos= useGrupos();
    const [nombre,setNombre]=useState()
    const[mision,setMision]=useState()
    const[vision,setVision]=useState()
    
    const crearGrupo=()=>{

        createGroup(nombre,mision,vision)

    }




    return (
       <div>
            Crear Grupos 


            <div>

            <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          
          placeholder="Nombre"
            ></input>

            
            <input
          value={mision}
          onChange={(e) => setMision(e.target.value)}
          
          placeholder="Mision"
            ></input>

            
            <input
          value={vision}
          onChange={(e) => setVision(e.target.value)}
          
          placeholder="Vision"
            ></input>


            <button onClick={crearGrupo}>Crear</button>
            </div>

            Eliminar grupos
            
            {grupos ? (
                    grupos.map((group,index)=>(
                        <div key={index}>
                            <EliminarGrupo key={index} nombre={group.nombre} ></EliminarGrupo>
                        </div>   
                ))


            ):("cargando")


            }

       </div>
    );
}
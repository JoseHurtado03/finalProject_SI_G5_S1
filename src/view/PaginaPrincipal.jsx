import { useState } from 'react'
import GroupCard from '../Components/TarjetaGrupo'
import useGrupos from '../CustomHooks/useGroups'
import { buscarGrupo } from '../Controllers/Groups';

function MainPage() {

    const grupos= useGrupos()
   
  return (
    <>
        <div style={{display:'flex', flexDirection:"row"}}>
        {grupos? (
            
            grupos.map((group,index)=>(
                    
                   
                    <div key={index}>
                        <GroupCard key={index} nombre={group.nombre} mision={group.mision} vision={group.vision}></GroupCard>
                    </div>

                
            ))

        ):(
            "Cargando"
        )



        }
     

     </div>
    </>
  )
}

export default MainPage
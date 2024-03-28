import useGrupos from '../CustomHooks/useGroups'
import EliminarGrupo from '../Components/TarjetaEliminarGrupo'; 

export default function Admin() {
    const grupos= useGrupos();

    return (
       <div>
            Crear Grupos 
            <div>Aqui va el formulario para crear grupos</div>

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
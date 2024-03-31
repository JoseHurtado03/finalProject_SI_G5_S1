//import { db } from '../firebase.js';
import useGrupo from "../CustomHooks/useGroup";
import { DeleteGrupo } from "../Controllers/Groups";
import styles from '../CSS/DeleteGroup.module.css';

export default function EliminarGrupo({  nombre }) {

    const Grupo=useGrupo(nombre)
    console.log(Grupo)
    // const handleEliminarGrupo = async () => {                         //Esta función es para eliminar los grupos, pero
    //     try {                                                       //no estoy tan claro por el tema del id. No sé si 
    //         await db.collection('Grupos').doc(id).delete();         //tienen asociado un id los grupos. De todas formas
    //         console.log('Grupo eliminado correctamente');           //esta lógica podría funcionar con unas pocas modificaciones.
    //     } catch (error) {
    //         console.error('Error al eliminar el grupo:', error);
    //     }
    //   };

    const handleEliminarGrupo=async ()=>{

        if(Grupo.Integrantes.length===0){
            
            DeleteGrupo(nombre)
        }else{
            console.log("HAY GENTE EN ESTE GRUPO")
        }
     
    }

    return (
        <div className={styles.card}>

            <div className={styles.nameGroup}>{nombre}</div>
            <button onClick={handleEliminarGrupo} className={styles.deleteB}>Borrar</button>

        </div>
    );
}
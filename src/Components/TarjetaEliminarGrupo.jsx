//import { db } from '../firebase.js';


export default function EliminarGrupo({ id, nombre }) {
    // const handleEliminarGrupo = async () => {                         //Esta función es para eliminar los grupos, pero
    //     try {                                                       //no estoy tan claro por el tema del id. No sé si 
    //         await db.collection('Grupos').doc(id).delete();         //tienen asociado un id los grupos. De todas formas
    //         console.log('Grupo eliminado correctamente');           //esta lógica podría funcionar con unas pocas modificaciones.
    //     } catch (error) {
    //         console.error('Error al eliminar el grupo:', error);
    //     }
    //   };

    return (
        <div style={{backgroundColor:"beige", margin:"1rem"}}>

            <div>{nombre}</div>
            <button onClick={handleEliminarGrupo}>Borrar</button>


        </div>
    );
}
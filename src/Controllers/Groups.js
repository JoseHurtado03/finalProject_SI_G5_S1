import { collection,doc,getDoc,getDocs, query,updateDoc } from "firebase/firestore";
import {db} from "../firebase"


export async function getGrupos() {
    const groupsCollection=collection(db,"Grupos")
    const groupsDocs = await getDocs(groupsCollection);

    const grupos = groupsDocs.docs.map(doc => (

     
    {

        nombre: doc.id,
        mision: doc.data().Mision,
        vision: doc.data().Vision

        
    }
    
    ));
 
    return grupos;
}


export async function buscarGrupo(nombre){

  
    
    const grupoDoc= await getDoc(doc(db,"Grupos",`${nombre}`))

    const grupo=grupoDoc.data()
    
    
    console.log(grupo)
    return grupo
  
}


export async function agregarComentario(nombre,comentario){



}


export async function AgregarComentarioGrupo(id,comentario){

    const grupoDoc= await getDoc(doc(db,"Grupos",`${id}`))
    const grupoRef = doc(db,"Grupos",`${id}`);
    
    const comentarios=grupoDoc.data().Comentarios
    
    comentarios.push(comentario)
    

    await updateDoc(grupoRef, {
        Comentarios: comentarios
      });
    
   


    
}
import { collection,doc,getDoc,getDocs, query,updateDoc, deleteDoc,setDoc} from "firebase/firestore";
import {db} from "../firebase"



export async function createGroup(nombre,mision,vision,tipo){
   
    console.log("se creo")
    const userCollection=doc(collection(db,"Grupos"),nombre)
    const usuario={nombre,mision,vision,Integrantes:[],Comentarios:[]}
    await setDoc(userCollection,usuario)
    
}




export async function getGrupos() {
    const groupsCollection=collection(db,"Grupos")
    const groupsDocs = await getDocs(groupsCollection);

    const grupos = groupsDocs.docs.map(doc => (

     
    {

        nombre: doc.id,
        mision: doc.data().Mision,
        vision: doc.data().Vision,
        Comentarios: doc.data().Comentarios,
        Integrantes: doc.data().Integrantes

        
    }
    
    ));
 
    return grupos;
}

export async function quitarPersonaGrupo(correo,id){
  
    const userDoc= await getDoc(doc(db,"Grupos",`${id}`))
    const userRef = doc(db,"Grupos",`${id}`);
    const grupo=userDoc.data()
    console.log(grupo)
    const personas=grupo.Integrantes        
    let index = personas.indexOf(correo);
    
    
    personas.splice(index, 1);

 

    await updateDoc(userRef, {
        Integrantes: personas
      });
    }
    

    export async function agregarPersonaGrupo(correo,id){

        const userDoc= await getDoc(doc(db,"Grupos",`${id}`))
        const userRef = doc(db,"Grupos",`${id}`);
        const grupo=userDoc.data()
        
        const personas=grupo.Integrantes        
        personas.push(correo)
    
     
    
        await updateDoc(userRef, {
            Integrantes: personas
          });
        }


export async function buscarGrupo(nombre){

  
    
    const grupoDoc= await getDoc(doc(db,"Grupos",`${nombre}`))

    const grupo=grupoDoc.data()
    
    
    console.log(grupo)
    return grupo
  
}




export async function AgregarPersona(id,email){

    const grupoDoc= await getDoc(doc(db,"Grupos",`${id}`))
    const grupoRef = doc(db,"Grupos",`${id}`);
    
    const personas=grupoDoc.data().Comentarios
    
    personas.push(email)
    

    await updateDoc(grupoRef, {
        Integrantes: personas
      });
    
   


    
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


export async function DeleteGrupo(id){
    await deleteDoc(doc(db, "Grupos", `${id}`));


}
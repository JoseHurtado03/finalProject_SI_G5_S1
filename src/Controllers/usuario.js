import { addDoc, collection,getDoc,getDocs,doc, setDoc,query,where,updateDoc } from "firebase/firestore";
import {db} from "../firebase"


//Modificar usuario, buscar usuario. 

export async function createUser(Nombre,Apellido,UserName,email,password,juego){
    //const id = generateId()
 
    const userCollection=doc(collection(db,"Usuarios"),email)
    const usuario={Nombre,Apellido,UserName,email,password,grupos:[],juego}
    await setDoc(userCollection,usuario)
    
}

export async function buscarUsuarioPorId(userId) {
    try {
      // Obtén una referencia al documento del usuario en Firestore
   



     // Reemplaza 'usuarios' con el nombre de tu colección
      const userRef= await getDoc(doc(db,"Usuarios",userId))
      // Consulta el documento en Firestore
     
      // Verifica si el documento existe
      if (userRef.exists()) {
        
        // El usuario existe en Firestore
        return true;
      } else {
        // El usuario no existe en Firestore
        return false;
      }
    } catch (error) {
    
      // Maneja el error según tus necesidades (lanzar una excepción, retornar un valor especial, etc.)
      throw error;
    }
  }





export async function updateCurrentUser(){

    const userCollection=collection(db,"Usuarios")

}

export async function buscarUsuario(correo,nombreg){

    const ususariosCollection=collection(db,"Usuarios")
    const ususarioQuery= query(ususariosCollection,where("email","==" , correo))
    const ususario = await getDocs(ususarioQuery)
    
    const us= ususario.docs[0].data();
    
    const Nombre=us.Nombre
    const Apellido=us.Apellido
    const UserName=us.UserName
    const email=us.email
    const password=us.password
    const grupos=us.grupos
    grupos.push(nombreg)

    const data={Nombre,Apellido,UserName,email,grupos,password}

    console.log(data)

    const ref = doc(ususariosCollection,correo);
    
    await setDoc(ref,data);

    
}


export async function subscribe(correo,idGrupo){

  const userDoc= await getDoc(doc(db,"Usuarios",`${correo}`))
  const userRef = doc(db,"Usuarios",`${correo}`);

  const usuario=userDoc.data()
  
  
    
    
    const subscriptions=userDoc.data().subscripciones
    
    subscriptions.push(idGrupo)
    

    await updateDoc(userRef, {
      subscripciones: subscriptions
      });

  
}


export async function getUsuario(correo){

      
  const userDoc= await getDoc(doc(db,"Usuarios",`${correo}`))

  const usuario=userDoc.data()
  
  
 
  return usuario

    
}



async function getUser(email){
    const groupsCollection=collection(db,"Clubes")
    const grupoQuery= query(groupsCollection,where("nombre","==" , nombre))
    const grupo = await getDoc(grupoQuery)

    return grupo
}

//se puede hacer de una manera mejor
export async function cambiarInfoUsuario(correo,Nombref,Apellidof,juegof){

  const userDoc= await getDoc(doc(db,"Usuarios",`${correo}`))

  const usuario=userDoc.data()
    
    const Nombre=Nombref
    const Apellido=Apellidof
    const UserName=us.UserName
    const email=us.email
    const password=us.password
    const grupos=us.grupos
    const juego=juegof
    

    const data={Nombre,Apellido,UserName,email,grupos,password,juego}

    

    const ref = doc(ususariosCollection,correo);
    
    await setDoc(ref,data);


    
}

export async function cambiarGrupo(correo,grupo){

    const userDoc= await getDoc(doc(db,"Usuarios",`${correo}`))
    const userRef = doc(db,"Usuarios",`${correo}`);
    const usuario=userDoc.data()
    
    


    


  
    
    
    
    

    await updateDoc(userRef, {
      subscripciones: grupo
      });
}


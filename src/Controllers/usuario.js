import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { validateAvailability } from "./Groups";
import { uploadGeneric, uploadImage } from "./files";

//Modificar usuario, buscar usuario.

export async function createUser(
  Nombre,
  Apellido,
  UserName,
  email,
  password,
  role,
  uid
) {
  //const id = generateId()
  console.log("se creo");
  const userCollection = doc(collection(db, "Usuarios"), uid);
  const usuario = {
    Nombre,
    Apellido,
    UserName,
    email,
    password,
    role,
    subscripciones: [],
  };
  await setDoc(userCollection, usuario);
  await uploadGeneric(email)
}

export async function buscarUsuarioPorId(userId) {
  try {
    // Obtén una referencia al documento del usuario en Firestore

    // Reemplaza 'usuarios' con el nombre de tu colección
    const userRef = await getDoc(doc(db, "Usuarios", userId));
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

export async function updateCurrentUser() {
  const userCollection = collection(db, "Usuarios");
}

export async function buscarUsuario(correo, nombreg) {
  const ususariosCollection = collection(db, "Usuarios");
  const ususarioQuery = query(
    ususariosCollection,
    where("email", "==", correo)
  );
  const ususario = await getDocs(ususarioQuery);

  const us = ususario.docs[0].data();

  const Nombre = us.Nombre;
  const Apellido = us.Apellido;
  const UserName = us.UserName;
  const email = us.email;
  const password = us.password;
  const grupos = us.grupos;
  grupos.push(nombreg);

  const data = { Nombre, Apellido, UserName, email, grupos, password };

  console.log(data);

  const ref = doc(ususariosCollection, correo);

  await setDoc(ref, data);
}

export async function subscribe(uid, userData, idGrupo) {
  let validation_boolean = await validateAvailability(idGrupo);
  let validation_suscribed = await isNotSuscribed(userData, idGrupo);
  console.log(validation_boolean, "and", validation_suscribed);
  if (validation_boolean && validation_suscribed) {
    const userDoc = await getDoc(doc(db, "Usuarios", uid));
    const userRef = doc(db, "Usuarios", uid);

    const usuario = userDoc.data();
    const subscriptions = userDoc.data().subscripciones;
    subscriptions.push(idGrupo);
    await updateDoc(userRef, {
      subscripciones: subscriptions,
    });
    console.log("Success");
    return true;
  } else {
    console.log("Not succes");
    return false;
  }
}

export async function isNotSuscribed(userData, idGrupo) {
  const suscription_group = userData.subscripciones;
  if (suscription_group.includes(idGrupo)) {
    return false;
  } else {
    return true;
  }
}
export async function getUsuario(uid) {
  const userDoc = await getDoc(doc(db, "Usuarios", uid));

  const usuario = userDoc.data();

  return usuario;
}

async function getUser(email) {
  const groupsCollection = collection(db, "Clubes");
  const grupoQuery = query(groupsCollection, where("nombre", "==", nombre));
  const grupo = await getDoc(grupoQuery);

  return grupo;
}

//se puede hacer de una manera mejor
export async function cambiarInfoUsuario(uid, Nombref, Apellidof ) {
  const userDoc= await getDoc(doc(db,"Usuarios",uid))
  const userRef = doc(db,"Usuarios",uid);

  


await updateDoc(userRef, {
  Nombre: Nombref,
  Apellido:Apellidof

})
window.location.reload();;
}

export async function cambiarGrupo(uid, id) {
  const userDoc = await getDoc(doc(db, "Usuarios", uid));
  const userRef = doc(db, "Usuarios", uid);
  const usuario = userDoc.data();

  const groups = usuario.subscripciones;
  let index = groups.indexOf(id);

  groups.splice(index, 1);

  await updateDoc(userRef, {
    subscripciones: groups,
  });
}

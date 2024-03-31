import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  deleteDoc,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { getImage } from "./files";
import { getUsuario } from "./usuario";

export async function createGroup(Nombre, Mision, Vision, Tipo) {
  console.log("se creo");
  const userCollection = doc(collection(db, "Grupos"), Nombre);
  const usuario = {
    Nombre,
    Mision,
    Vision,
    Integrantes: [],
    Comentarios: [],
    Tipo,
  };
  await setDoc(userCollection, usuario);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  window.location.reload();
}

export async function quitarPersonaGrupo(correo, id) {
  const userDoc = await getDoc(doc(db, "Grupos", `${id}`));
  const userRef = doc(db, "Grupos", `${id}`);
  const grupo = userDoc.data();
  console.log(grupo);
  const personas = grupo.Integrantes;
  let index = personas.indexOf(correo);

  personas.splice(index, 1);

  await updateDoc(userRef, {
    Integrantes: personas,
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  window.location.reload();
}

export async function validateAvailability(id) {
  const userDoc = await getDoc(doc(db, "Grupos", `${id}`));
  const grupo = userDoc.data();
  if (grupo.Integrantes.length >= 30) {
    return false;
  } else {
    return true;
  }
}

export async function agregarPersonaGrupo(uid, id) {
  const userDoc = await getDoc(doc(db, "Grupos", `${id}`));
  const userRef = doc(db, "Grupos", `${id}`);
  const grupo = userDoc.data();
  let validation_boolean = isNotSuscribed(uid, id);

  const personas = grupo.Integrantes;
  if (personas.length < 30 && validation_boolean) {
    console.log("success");
    personas.push(uid);
    await updateDoc(userRef, {
      Integrantes: personas,
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.reload();
  }
  if (!validation_boolean) {
    window.alert("El usuario se encuentra en el grupo");
  }
  if (personas.length >= 30) {
    window.alert("El grupo está lleno");
  }
}

export async function isNotSuscribed(uid, id) {
  const userDoc = await getDoc(doc(db, "Grupos", `${id}`));
  const suscription_group = userDoc.Integrantes;
  if (suscription_group.includes(uid)) {
    return false;
  } else {
    return true;
  }
}

export async function buscarGrupo(nombre) {
  const grupoDoc = await getDoc(doc(db, "Grupos", `${nombre}`));

  const grupo = grupoDoc.data();

  console.log(grupo);
  return grupo;
}

export async function getGrupos() {
  const groupsCollection = collection(db, "Grupos");
  const groupsDocs = await getDocs(groupsCollection);

  const grupos = groupsDocs.docs.map((doc) => ({
    nombre: doc.id,
    mision: doc.data().Mision,
    vision: doc.data().Vision,
    Comentarios: doc.data().Comentarios,
    Integrantes: doc.data().Integrantes,
  }));

  return grupos;
}

export async function getGruposbyType(type) {
  const groupsCollections = collection(db, "Grupos");
  const groupDocs = await getDocs(groupsCollections);
  const groups = groupDocs.docs
    .map((doc) => ({
      nombre: doc.id,
      Integrantes: doc.data().Integrantes,
      Tipo: doc.data().Tipo,
    }))
    .filter((group) => group.Tipo.toLowerCase() === type.toLowerCase());
  console.log(groups);
  return groups;
}

export async function getPicNName(id) {
  const GroupDoc = await getDoc(doc(db, "Grupos", `${id}`));
  const group = GroupDoc.data();
  const groupMembers = group.Integrantes;
  const groups = await Promise.all(
    groupMembers.map(async (member) => {
      const user = await getUsuario(member);
      console.log("El user es :", user);
      console.log("El email es:", user.email);
      const pic = await getImage(user.email);
      return {
        nombre: user.Nombre,
        pic: pic,
      };
    })
  );
  return groups;
}

export async function AgregarPersona(id, email) {
  const grupoDoc = await getDoc(doc(db, "Grupos", `${id}`));
  const grupoRef = doc(db, "Grupos", `${id}`);

  const personas = grupoDoc.data().Comentarios;

  personas.push(email);

  await updateDoc(grupoRef, {
    Integrantes: personas,
  });
}
export async function AgregarComentarioGrupo(id, comentario) {
  const grupoDoc = await getDoc(doc(db, "Grupos", `${id}`));
  const grupoRef = doc(db, "Grupos", `${id}`);

  const comentarios = grupoDoc.data().Comentarios;

  comentarios.push(comentario);

  await updateDoc(grupoRef, {
    Comentarios: comentarios,
  });
}

export async function DeleteGrupo(id) {
  await deleteDoc(doc(db, "Grupos", `${id}`));
  await new Promise((resolve) => setTimeout(resolve, 1000));
  window.location.reload();
}

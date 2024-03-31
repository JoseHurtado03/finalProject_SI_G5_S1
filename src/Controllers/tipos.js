import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    deleteDoc,
    setDoc,
    where
  } from "firebase/firestore";
  import { db } from "../firebase";


export async function buscarTipos(){
    const grupoDoc = await getDoc(doc(db, "Tipos", `Tipos`));
    const tipos=grupoDoc.data().Tipos
    
    console.log(tipos)
    // doc.data() is never undefined for query doc snapshots
    return tipos
  };

  export async function agregarTipos(tipo){
    const grupoDoc = await getDoc(doc(db, "Tipos", `Tipos`));
    const tipos=grupoDoc.data().Tipos



    const tipe=tipos

    if(!tipos.includes(tipo)){
        tipe.push(tipo)
    }
    
    const tipoRef = doc(db,"Tipos","Tipos");
    await updateDoc(tipoRef, {
        Tipos:tipe
      
      });

    
  };

  export async function eliminarTipo(tipo) {
    const grupoDoc = await getDoc(doc(db, "Tipos", "Tipos"));
    const tipos = grupoDoc.data().Tipos;
  
    const tiposFiltrados = tipos.filter((t) => t !== tipo);
  
    const tipoRef = doc(db, "Tipos", "Tipos");
    await updateDoc(tipoRef, {
      Tipos: tiposFiltrados
    });
  }
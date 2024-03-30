import {ref,uploadBytes,getDownloadURL} from "firebase/storage"
import { storage } from "../firebase"



export async function uploadImage(file,email){
    const storageRef = ref(storage,`images/${email}` );
    
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      })



}

export async function getImage(email){
    const storageRef = ref(storage,`images/${email}` );

    const img=getDownloadURL(storageRef)

    return img

}


import {GoogleAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup,signOut} from "firebase/auth"
import {auth} from "../firebase"



export const createUserWithEmail = async (email,password) => {


    try{
        console.log(email,password)
        
        return   (await createUserWithEmailAndPassword(auth,email,password))
    }catch (e){
        console.error(e)
        return null
    }
    
}

export const SingInwithEmail = async(email,password)=>{


    try{
        
        return signInWithEmailAndPassword(auth,email,password)
    }catch (e){
        console.error(e)
        return null
    }

     
}




export const singInGoogle= async ()=>{

    const provider= new GoogleAuthProvider();
    const result =  await signInWithPopup(auth,provider) 
    //console.log(result)
    return result
}


export const singOut= async ()=>{
    

    await signOut(auth)

    console.log("Se cerro la sesion")
    
     
    
}
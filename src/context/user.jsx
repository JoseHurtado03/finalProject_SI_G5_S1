import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth'; 
import { auth, db } from "../firebase";
import { doc, getDoc } from "@firebase/firestore";
export const UserContext = React.createContext();

export function UserContextProvider({ children }) {
    const [user, loading] = useAuthState(auth); 

    const [userData, setUserData] = useState(null);
    const [isLoadingUserData, setIsLoadingUserData] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                setIsLoadingUserData(true);
                try {
                    const userRef = doc(db, "Usuarios", authUser.uid);
                    const userDoc = await getDoc(userRef);
                    if (userDoc.exists) {
                        setUserData(userDoc.data());
                    } else {
                        console.log("No se encontraron datos para el usuario en Firestore.");
                    }
                } catch (error) {
                    console.error("Error al obtener datos del usuario:", error);
                }
                setIsLoadingUserData(false);
            } else {
                setUserData(null); // Si no hay usuario autenticado, resetea los datos del usuario
            }
        });

        return () => unsubscribe(); // Limpia el listener cuando el componente se desmonta
    }, []);
    
    return (
        <UserContext.Provider
            value={{
                user,
                userData,
                loading,
                isLoadingUserData,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}
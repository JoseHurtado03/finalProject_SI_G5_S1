import React from 'react'
import Header from '../Components/Header';
import {useUserContext } from "../context/user";
import styles from  '../CSS/Search.module.css'

export default function Search() {
    const {user} = useUserContext();
    return (
    <div>
        <Header user={user}></Header>
        <h1 className={styles.title}>¡Tenemos lo que buscas! Busca el grupo que prefieras</h1>
        <section style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <div className={styles.cuadrito}>
                <input placeholder="Ingresa el nombre del grupo" className={styles.input}></input>
            </div>
            <button className={styles.boton}>🔎</button>
        </section>
    </div>
  )
}

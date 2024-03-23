import React from 'react'
//import { useState } from 'react'
import styles from '../CSS/PerfilUsuario.module.css'



export default function PerfilUsuario() {
    return (
      <div className={styles.container}>
        <section className={styles.section}>
          <img className={styles.imagen} src="https://banner2.cleanpng.com/20180331/khw/kisspng-computer-icons-user-clip-art-user-5abf13d4b67e20.4808850915224718927475.jpg" alt="Imagen de usuario" />
          <h2>[Nombre de Usuario]</h2>
          <h1 className={styles.ubicacion}>[Ubicación de Usuario]</h1>
          <div className={styles.bordes}></div>
          <section/>
        </section>
        <section className={styles.section}>
          <section>
            <h2>Telefono</h2>
            <h2>[Telefono del usuario]</h2>
            <button>Editar</button>
          </section>
          <section>
            <h2>Correo</h2>
            <h2>[Correo del usuario]</h2>
            <button>Editar</button>
          </section>
          <section>
            <h2>Pais</h2>
            <h2>[Pais del usuario]</h2>
            <button>Editar</button>
          </section>
          <section>
            <h2>Afiliciones</h2>
            <ul className={styles.afiliaciones}>
              <li>[Afiliciacion]</li>
              <li>[Afiliciacion2]</li>
              <li>[Afiliciacion3]</li>
            </ul>
          </section>
        </section>
      </div>
    );
  }
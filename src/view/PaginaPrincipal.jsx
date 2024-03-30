import { useState } from 'react'
import GroupCard from '../Components/TarjetaGrupo'
import useGrupos from '../CustomHooks/useGroups'
import { buscarGrupo } from '../Controllers/Groups';
import styles from '../CSS/HomePage.module.css'
import Header from '../Components/Header';
import { useUserContext } from "../context/user";

function MainPage() {
    const grupos= useGrupos()
    const {user} = useUserContext();

  return (
    <>
      <div>

        <Header user={user}></Header>

        <section>
          <h1 className={styles.mainTitle}>¿Buscas formar parte de alguna agrupación estudiantil? ¡MetroGroups es para ti!</h1>
        </section>
        <div style={{display:'flex', flexDirection:"row"}}>
        {grupos? (
            grupos.map((group,index)=>(
                    <div key={index}>
                        <GroupCard key={index} nombre={group.nombre} mision={group.mision} vision={group.vision}></GroupCard>
                    </div>   
            ))
        ):(
            "Cargando"
        )
        }
        </div>
        <section style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#FFAA2A'}}>
          <section>
            <h2 className={styles.valueTitle}>Visión</h2>
            <h3 className={styles.valueText}>Ser la plataforma líder en la gestión y promoción de las Agrupaciones Estudiantiles de la Universidad Metropolitana. Nuestra visión es fomentar la participación activa de la comunidad estudiantil en actividades recreativas, culturales, deportivas y científicas, impulsando el sentido de pertenencia y liderazgo en un entorno colaborativo y diverso.</h3>
            <h2 className={styles.valueTitle}>Misión</h2>
            <h3 className={styles.valueText}>Nuestra misión es proporcionar una plataforma integral y accesible que facilite la gestión y difusión de las Agrupaciones Estudiantiles de la Universidad Metropolitana. Nos comprometemos a ofrecer herramientas innovadoras que promuevan el trabajo en equipo, el desarrollo de habilidades y el intercambio de conocimientos entre los estudiantes.</h3>
          </section>
          <section className={styles.foto}>Logo de la página</section>
        </section>
        <section style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#FFE9D0'}}>
          <section className={styles.foto}></section>
          <section>
            <h2 className={styles.subTitle}>¡Todas tienen algo distinto que ofrecerte!</h2>
            <h3 className={styles.info}>¡Contamos con información completa y actualizada de las agrupaciones para que puedas escoger la que más te guste!</h3>
          </section>
        </section>
        <section style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#FFAA2A'}}>
          <section>
            <h2 className={styles.subTitle}>Te proporcionamos una herramienta a la palma de tu mano</h2>
            <h3 className={styles.info}>¡Somos un recurso indispensable para la selección de tus grupos favoritos!</h3>
          </section>
          <section className={styles.foto}></section>
        </section>
        <section style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor:'#F90'}}>
          <section className={styles.foto}></section>
          <section>
            <h2 className={styles.subTitle}>Te proporcionamos una plataforma para que tengas dónde escoger</h2>
            <h3 className={styles.info}>Puedes escoger entre 36 agrupaciones estudiantiles</h3>
          </section>
        </section>
      </div>
    </>
  )
}

export default MainPage
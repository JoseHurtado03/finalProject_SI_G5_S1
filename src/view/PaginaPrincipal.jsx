import { useState } from 'react'
import GroupCard from '../Components/TarjetaGrupo'
import useGrupos from '../CustomHooks/useGroups'
import { buscarGrupo } from '../Controllers/Groups';
import styles from '../CSS/HomePage.module.css'

function MainPage() {
    const grupos= useGrupos()

  return (
    <>
      <div>
        <section>
          <h1 className={styles.mainTitle}>¿Buscas formar parte de alguna agrupación estudiantil?</h1>
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
        <section style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#FFE9D0'}}>
          <section className={styles.foto}>Imagen</section>
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
          <section className={styles.foto}>Imagen</section>
        </section>
        <section style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor:'#F90'}}>
          <section className={styles.foto}>Imagen</section>
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
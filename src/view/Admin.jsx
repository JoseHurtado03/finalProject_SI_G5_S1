import useGrupos from '../CustomHooks/useGroups'
import EliminarGrupo from '../Components/TarjetaEliminarGrupo'; 
import { useState } from 'react';
import { createGroup } from '../Controllers/Groups';
import styles from '../CSS/Admin.module.css'
import GroupCard from '../Components/TarjetaGrupo'

export default function Admin() {

    const grupos= useGrupos();
    const [nombre,setNombre]=useState()
    const[mision,setMision]=useState()
    const[vision,setVision]=useState()
    
    const crearGrupo=()=>{

        createGroup(nombre,mision,vision)

    }

    return (
       <div>
            <h1 className={styles.mainTitle}>Administrador</h1>
            <section style={{backgroundColor: '#F90'}}>
              <h2 className={styles.subTitle}>Crear Grupos</h2> 
              <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                <section style={{display: 'flex', flexDirection: 'column'}}>
                  <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className={styles.input}
                    placeholder="Nombre"
                  ></input>

                  <input
                    value={mision}
                    onChange={(e) => setMision(e.target.value)}
                    className={styles.input}
                    placeholder="Misión"
                  ></input>

                  <input
                    value={vision}
                    onChange={(e) => setVision(e.target.value)}
                    className={styles.input}
                    placeholder="Visión"
                  ></input>

                  <input
                    className={styles.input}
                    placeholder="Tipo de grupo"
                  ></input>
                </section>
                <button onClick={crearGrupo} className={styles.createB}>Crear</button>
              </div>
            </section>
            <section>
              <h2 className={styles.subTitle}>Eliminar grupos</h2>
              <section style={{display: 'flex', flexDirection: 'row'}}>
                {grupos ? (
                        grupos.map((group,index)=>(
                            <div key={index}>
                                <EliminarGrupo key={index} nombre={group.nombre} ></EliminarGrupo>
                            </div>   
                    ))

                ):("cargando")

                }
              </section>
            </section>
            <section style={{backgroundColor: '#FFE9D0'}}>
              <h2 className={styles.subTitle}>Tipos de Grupos</h2>
              <section>
                <input className={styles.input} placeholder='Nombre del tipo de grupo'></input>
                <button className={styles.createB} style={{width: '175.2px', height:'76.476px', fontSize: '25.281px'}}>Crear</button>
              </section>
              <section className={styles.groups}>
                  <li>Aqui van los tipos de grupos</li>
              </section>
            </section>
            <section style={{backgroundColor: '#FFAA2A'}}>
              <h2 className={styles.subTitle}>Grupos Disponibles</h2>
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
            </section>
       </div>
    );
}
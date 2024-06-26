import { useState } from "react";
import GroupCard from "../Components/TarjetaGrupo";
import useGrupos from "../CustomHooks/useGroups";
import { buscarGrupo } from "../Controllers/Groups";
import styles from "../CSS/HomePage.module.css";
import Header from "../Components/Header";
import { useUserContext } from "../context/user";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// npm install react-multi-carousel --save

function MainPage() {
  const grupos = useGrupos();
  const { user } = useUserContext();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <div className={styles.everything}>
        <Header user={user}></Header>
        <section>
          <h1 className={styles.mainTitle}>
            ¿Buscas formar parte de alguna agrupación estudiantil? ¡MetroGroups
            es para ti!
          </h1>
        </section>
        {/* Funcion que no sirve del carrusel */}
        {/* <div style={{display:'flex', flexDirection:"row"}}>
      {grupos ? (<GroupCarousel grupos={grupos} />) : (
    "Cargando"
    )}
        </div>  */}

        {grupos ? (
          <Carousel responsive={responsive}>
            {grupos.map((group, index) => (
              <GroupCard
                key={index}
                nombre={group.nombre}
                mision={group.mision}
                vision={group.vision}
              ></GroupCard>
            ))}
          </Carousel>
        ) : (
          <div>cargando...</div>
        )}

        <div style={{ display: "flex", flexDirection: "row" }}></div>
        <section
          className={styles.section1}
          style={{
            backgroundColor: "#ffaa2a",
          }}
        >
          <section>
            <h2 className={styles.valueTitle}>Visión</h2>
            <h3 className={styles.valueText}>
              Crear una plataforma virtual integral que sirva como centro de
              gestión e información para las agrupaciones estudiantiles de la
              Universidad Metropolitana. El objetivo es abordar de manera
              eficiente la creciente necesidad de centralizar la información y
              la gestión de los diversos grupos estudiantiles presentes en el
              campus, fomentando la colaboración, la participación activa y el
              intercambio de ideas entre ellos.
            </h3>
            <h2 className={styles.valueTitle}>Misión</h2>
            <h3 className={styles.valueText}>
              Desarrollar una plataforma web que facilite la gestión, la
              visualización y el registro de los grupos estudiantiles
              encontrados la Universidad Metropolitana, para promover la
              participación estudiantil y ofrecer una herramienta efectiva para
              la interacción con los grupos, para así permitir a los estudiantes
              encontrar, afiliarse, contribuir y dar feedback sobre las
              agrupaciones de manera eficiente y efectiva.
            </h3>
          </section>
          <img src={"/Logo.png"} alt="club" className={styles.foto} />
        </section>
        <section
          className={styles.section1}
          style={{
            backgroundColor: "#FFE9D0",
          }}
        >
          <section className={styles.foto_Agrupacion2}></section>
          <section>
            <h2 className={styles.subTitle}>
              ¡Todas tienen algo distinto que ofrecerte!
            </h2>
            <h3 className={styles.info}>
              ¡Contamos con información completa y actualizada de las
              agrupaciones para que puedas escoger la que más te guste!
            </h3>
          </section>
        </section>
        <section
          className={styles.section1}
          style={{
            backgroundColor: "#FFAA2A",
          }}
        >
          <section>
            <h2 className={styles.subTitle}>
              Te proporcionamos una herramienta a la palma de tu mano
            </h2>
            <h3 className={styles.info}>
              ¡Somos un recurso indispensable para la selección de tus grupos
              favoritos!
            </h3>
          </section>
          <section className={styles.foto_Agrupacion}></section>
        </section>
        <section
          className={styles.section1}
          style={{
            backgroundColor: "#F90",
          }}
        >
          <section className={styles.foto}></section>
          <section>
            <h2 className={styles.subTitle}>
              Te proporcionamos una plataforma para que tengas dónde escoger
            </h2>
            <h3 className={styles.info}>
              Puedes escoger entre 36 agrupaciones estudiantiles
            </h3>
          </section>
        </section>
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "black",
          }}
        >
          <h2
            className={styles.subTitle}
            style={{
              fontSize: "30px",
              color: "white",
              height: "20px",
              marginLeft: "10%",
            }}
          >
            Información de Contacto:
          </h2>
          <h3
            className={styles.text}
            style={{ color: "white", marginLeft: "10%", marginTop: "10%" }}
          >
            Teléfono: (+58)412-0117286
          </h3>
          <h3
            className={styles.text}
            style={{ color: "white", marginLeft: "10%" }}
          >
            Correo: angel.carrero@correo.unimet.edu.ve
          </h3>
        </section>
      </div>
    </>
  );
}

export default MainPage;

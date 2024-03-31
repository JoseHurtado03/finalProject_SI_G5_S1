import React from "react";
import Header from "../Components/Header";
import { useUserContext } from "../context/user";
import styles from "../CSS/Search.module.css";
import { useState } from "react";
import { buscarGrupo } from "../Controllers/Groups";
import TarjetaDispo from "../Components/TarjetaDispo";

export default function Search() {
  const [showGroup, setShowGroup] = useState(false);
  const { user } = useUserContext();
  const [group_name, setGrupo] = useState("");
  const [dispo, setDispo] = useState("");
  const handleChange = (e) => {
    setGrupo(e.target.value);
    setShowGroup(false);
  };
  const handleSearch = async () => {
    try {
      const grupo = await buscarGrupo(group_name);
      setDispo(grupo.Integrantes);
      setShowGroup(true);
      console.log(dispo.length);
      console.log(grupo);
    } catch (error) {
      console.error("Error al buscar grupos:", error);
    }
  };
  return (
    <div>
      <Header user={user}></Header>
      <section className={styles.mainSection}>
        <h1 className={styles.title}>
          ¡Tenemos lo que buscas! Busca el grupo que prefieras
        </h1>
        <section
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div className={styles.cuadrito}>
            <input
              placeholder="Ingresa el nombre del grupo"
              className={styles.input}
              value={group_name}
              onChange={handleChange}
            ></input>
          </div>
          <button onClick={handleSearch} className={styles.boton}>
            🔎
          </button>
        </section>
      </section>
      {showGroup && (
        <TarjetaDispo nombre={group_name} dispo={dispo.length}></TarjetaDispo>
      )}
    </div>
  );
}

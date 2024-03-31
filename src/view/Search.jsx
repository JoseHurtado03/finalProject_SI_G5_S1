import React from "react";
import Header from "../Components/Header";
import { useUserContext } from "../context/user";
import styles from "../CSS/Search.module.css";
import { useState } from "react";
import { buscarGrupo, getGruposbyType } from "../Controllers/Groups";
import TarjetaDispo from "../Components/TarjetaDispo";

export default function Search() {
  const [showGroup, setShowGroup] = useState(false);
  const { user } = useUserContext();
  const [filtro, setFiltro] = useState(false);
  const [groups, setGroups] = useState(false);
  const [group_name, setGrupo] = useState("");
  const [dispo, setDispo] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (e) => {
    setGrupo(e.target.value);
    setShowGroup(false);

    setGrupo(e.target.value);
    setGroups(false);
  };

  const handleSearchGroups = async () => {
    try {
      const grupo = await buscarGrupo(group_name);
      setDispo(grupo.Integrantes);
      setShowGroup(true);
    } catch (error) {
      window.alert("No se encontró ningún grupo");
      console.error("Error al buscar grupos:", error);
    }
  };

  const handleSearchCategory = async () => {
    try {
      const groups = await getGruposbyType(group_name);
      setSearchResults(groups);
      setGroups(true);
    } catch (error) {
      console.error("Error al buscar grupos:", error);
    }
  };

  const changeButton = async () => {
    if (filtro) {
      setFiltro(false);
    } else {
      setFiltro(true);
    }
    if (showGroup) {
      setShowGroup(false);
      setShowGroup(false);
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
            marginBottom: "20px",
          }}
        >
          <div className={styles.cuadrito}>
            <input
              placeholder="Ingrese el nombre"
              className={styles.input}
              value={group_name}
              onChange={handleChange}
            ></input>
          </div>

          {filtro ? (
            <button onClick={handleSearchCategory} className={styles.boton}>
              🔍
            </button>
          ) : (
            <button onClick={handleSearchGroups} className={styles.boton}>
              🔎
            </button>
          )}
        </section>
      </section>
      {filtro ? (
        <div onClick={changeButton} className={styles.mode}>
          Buscar Grupos
        </div>
      ) : (
        <div onClick={changeButton} className={styles.mode}>
          Buscar Categoría
        </div>
      )}
      {showGroup && (
        <TarjetaDispo nombre={group_name} dispo={dispo.length}></TarjetaDispo>
      )}
      <div className={styles.gruposFiltro}>
        {groups &&
          searchResults.map((group) => (
            <TarjetaDispo
              nombre={group.nombre}
              dispo={group.Integrantes.length}
            />
          ))}
      </div>
    </div>
  );
}

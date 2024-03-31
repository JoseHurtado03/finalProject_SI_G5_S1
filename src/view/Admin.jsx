import useGrupos from "../CustomHooks/useGroups";
import EliminarGrupo from "../Components/TarjetaEliminarGrupo";
import { useEffect, useState } from "react";
import { createGroup } from "../Controllers/Groups";
import { buscarTipos, agregarTipos, eliminarTipo } from "../Controllers/tipos";
import styles from "../CSS/Admin.module.css";
import GroupCard from "../Components/TarjetaGrupo";

export default function Admin() {
  const grupos = useGrupos();
  const [Nombre, setNombre] = useState();
  const [Mision, setMision] = useState();
  const [Vision, setVision] = useState();
  const [tipos, setTipos] = useState();
  const [tipo, setTipo] = useState();
  const [tipoSeleccionado, setTipoSeleccionado] = useState();
  const crearGrupo = () => {
    createGroup(Nombre, Mision, Vision, tipoSeleccionado);
  };

  useEffect(() => {
    const cargarTipos = async () => {
      const tipe = await buscarTipos();
      console.log(tipos);
      setTipos(tipe);
    };
    cargarTipos();
  }, []);
  const handleAgregarTipo = async () => {
    const type = tipo;
    if (!tipos.includes(type)) {
      await agregarTipos(type);
      const updatedTipos = await buscarTipos();
      setTipos(updatedTipos);
    } else {
      console.log('El tipo ya existe');
    }
    setTipo('');
  };
  return (
    <div>
      <h1 className={styles.mainTitle}>Administrador</h1>
      <section style={{ backgroundColor: "#F90" }}>
        <h2 className={styles.subTitle}>Crear Grupos</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <section style={{ display: "flex", flexDirection: "column" }}>
            <input
              value={Nombre}
              onChange={(e) => setNombre(e.target.value)}
              className={styles.input}
              placeholder="Nombre"
            ></input>

            <input
              value={Mision}
              onChange={(e) => setMision(e.target.value)}
              className={styles.input}
              placeholder="Misión"
            ></input>

            <input
              value={Vision}
              onChange={(e) => setVision(e.target.value)}
              className={styles.input}
              placeholder="Visión"
            ></input>

            <select
              className={styles.input}
              value={tipoSeleccionado}
              onChange={(e) => setTipoSeleccionado(e.target.value)}
            >
              <option value="" style={{ color: "#BCBCBC" }}>
                Tipo de Grupo
              </option>
              {tipos &&
                tipos.map((tipo, index) => (
                  <option key={index} value={tipo}>
                    {tipo}
                  </option>
                ))}
            </select>
          </section>
          <button onClick={crearGrupo} className={styles.createB}>
            Crear
          </button>
        </div>
      </section>
      <section>
        <h2 className={styles.subTitle}>Eliminar grupos</h2>
        <section style={{ display: "flex", flexDirection: "row" }}>
          {grupos
            ? grupos.map((group, index) => (
                <div key={index}>
                  <EliminarGrupo
                    key={index}
                    nombre={group.nombre}
                  ></EliminarGrupo>
                </div>
              ))
            : "cargando"}
        </section>
      </section>
      <section style={{ backgroundColor: "#FFE9D0" }}>
        <h2 className={styles.subTitle}>Tipos de Grupos</h2>
        <section style={{ display: "flex", flexDirection: "row"}}>
			<section>
        	  <section style={{ display: "flex", flexDirection: "row"}}>
        	    <input
        	      value={tipo}
        	      onChange={(e) => setTipo(e.target.value)}
        	      className={styles.input}
        	      style={{width:'400px'}}
        	      placeholder="Tipo"
        	    ></input>
        	    <button
        	      className={styles.createB}
        	      style={{
        	        width: "170px",
        	        height: "76.476px",
        	        fontSize: "25.281px",
        	      }}
        	      onClick={() => {
        	        if (tipo === "") {
        	          alert("Debe ingresar un nombre de tipo para crearlo");
        	        } else {
        	          handleAgregarTipo(tipo);
        	        }
        	      }}
        	    >
        	      Crear
        	    </button>
        	  </section>
        	  <section className={styles.groups}>
        	    {tipos
        	      ? tipos.map((tipo, index) => <div key={index}>{tipos[index]}</div>)
        	      : "cargando.."}
        	  </section>
        	</section>
        	<section>
        	    <select
        	      className={styles.input}
        	      value={tipoSeleccionado}
				  style={{width: '400px'}}
        	      onChange={(e) => setTipoSeleccionado(e.target.value)}
        	    >
        	      <option value="" style={{ color: "#BCBCBC" }}>
        	        Tipo de Grupo
        	      </option>
        	      {tipos &&
        	        tipos.map((tipo, index) => (
        	          <option key={index} value={tipo}>
        	            {tipo}
        	          </option>
        	        ))}
        	    </select>
				<button
  				  className={styles.deleteB}
  				  onClick={() => {
  				    eliminarTipo(tipoSeleccionado);
  				    // Actualizar la lista de tipos después de eliminar el tipo
  				    const updatedTipos = tipos.filter(
  				      (tipo) => tipo !== tipoSeleccionado
  				    );
  				    setTipos(updatedTipos);
  				    // Reiniciar la selección de tipo
  				    setTipoSeleccionado("");
  		
  				  }}
  				>Borrar Tipo de Grupo</button>
        	</section>
		</section>
      </section>
      <section style={{ backgroundColor: "#FFAA2A" }}>
        <h2 className={styles.subTitle}>Grupos Disponibles</h2>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {grupos
            ? grupos.map((group, index) => (
                <div key={index}>
                  <GroupCard
                    key={index}
                    nombre={group.nombre}
                    mision={group.mision}
                    vision={group.vision}
                  ></GroupCard>
                </div>
              ))
            : "Cargando"}
        </div>
      </section>
    </div>
  );
}

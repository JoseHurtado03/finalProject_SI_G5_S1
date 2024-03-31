import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  AgregarComentarioGrupo,
  agregarPersonaGrupo,
  quitarPersonaGrupo,
} from "../Controllers/Groups";
import Header from "../Components/Header";
import useGrupo from "../CustomHooks/useGroup";
import Comment from "../Components/Comentario";
import Paypal from "../Components/paypal";
import styles from "../CSS/PaginaGrupo.module.css";
import { useUserContext } from "../context/user";
import { getUsuario, subscribe, cambiarGrupo } from "../Controllers/usuario";

function GroupPage() {
  const params = useParams();
  const grupo = useGrupo(params.id);
  const { user, userData } = useUserContext();

  const [Comentarios, setComentarios] = useState();

  const [Comentario, setComentario] = useState("");

  const [notSubscribed, setNotSubscribed] = useState(false);
  const [subscrite, setSubscrite] = useState(true);

  const [nombreUsuario, setNombreUsuario] = useState("");

  const handleClick = () => {
    AgregarComentarioGrupo(params.id, {
      nombre: nombreUsuario,
      comentario: Comentario,
    });
    setComentario("");
    Comentarios.push({ nombre: nombreUsuario, comentario: Comentario });
  };

  useEffect(() => {
    if (userData) {
      const uwu = async () => {
        const usuario = await getUsuario(user.uid);
        setNombreUsuario(usuario.Nombre + " " + usuario.Apellido);

        const gruposUsuario = usuario.subscripciones;
        console.log(gruposUsuario, params.id, "hahha");
        if (gruposUsuario.includes(params.id)) {
          setNotSubscribed(true);
          setSubscrite(false);
        }
      };

      uwu();
    }
  }, [userData]);

  const handleClickSubscribe = () => {
    if (user != null) {
      const uid = user.uid;
      subscribe(uid, userData, params.id);
      agregarPersonaGrupo(uid, params.id);
      window.alert("Success!");
    } else {
      window.alert("Inicie sesión xfa");
    }
  };

  const handleClickUnsubscribe = () => {
    console.log(user.uid);

    cambiarGrupo(user.uid, params.id);
    quitarPersonaGrupo(user.uid, params.id);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (grupo != null) {
      setComentarios(grupo.Comentarios);
    }
  }, [grupo]);

  return (
    <div style={{ backgroundColor: "#FF8F50" }}>
      <Header user={user}></Header>
      {grupo ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <section>
            <h1 className={styles.mainTitle}>{params.id}</h1>
          </section>
          <section>
            <section className={styles.mission}>
              <h2>Mision</h2>
              <div>{grupo.Mision} </div>
            </section>
            <section className={styles.vision}>
              <h2>Vision</h2>
              <div>{grupo.Vision} </div>
            </section>
          </section>
        </div>
      ) : (
        ""
      )}

      <div style={{ margin: "2rem" }}>
        <Paypal></Paypal>
      </div>

      <section style={{ display: "flex", flexDirection: "row" }}>
        {notSubscribed ? (
          ""
        ) : (
          <button onClick={handleClickSubscribe} className={styles.subcribe}>
            +
          </button>
        )}
        {subscrite ? (
          ""
        ) : (
          <button onClick={handleClickUnsubscribe} className={styles.subcribe}>
            ✔
          </button>
        )}

        <div>
          <input
            value={Comentario}
            onChange={(e) => setComentario(e.target.value)}
            className={styles.inputMsg}
            placeholder="Ingresa un comentario"
          ></input>
          <button onClick={handleClick} className={styles.sendButton}>
            Enviar
          </button>

          <div>
            {Comentarios
              ? Comentarios.map((coment, index) => (
                  <Comment
                    key={index}
                    nombre={coment.nombre}
                    comentario={coment.comentario}
                  ></Comment>
                ))
              : "Cargando"}
          </div>
        </div>
      </section>
    </div>
  );
}
export default GroupPage;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  AgregarComentarioGrupo,
  agregarPersonaGrupo,
  quitarPersonaGrupo,
} from "../Controllers/Groups";
import MemberInfo from "../Components/MemberInfo";
import Header from "../Components/Header";
import useGrupo from "../CustomHooks/useGroup";
import Comment from "../Components/Comentario";
import Paypal from "../Components/paypal";
import styles from "../CSS/PaginaGrupo.module.css";
import { useUserContext } from "../context/user";
import { getUsuario, subscribe, cambiarGrupo } from "../Controllers/usuario";
import { getPicNName } from "../Controllers/Groups";

function GroupPage() {
  const params = useParams();
  const noSpacesString = params.id.replace(/\s/g, "");
  const grupo = useGrupo(params.id);
  const { user, userData } = useUserContext();

  const [Comentarios, setComentarios] = useState();

  const [Comentario, setComentario] = useState("");

  const [notSubscribed, setNotSubscribed] = useState(false);
  const [subscrite, setSubscrite] = useState(true);

  const [nombreUsuario, setNombreUsuario] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [members, setMembers] = useState([]);

  const handleClick = () => {if (userData && (Comentario.trim() != "")){
    AgregarComentarioGrupo(params.id, {
      nombre: nombreUsuario,
      comentario: Comentario,
    });
    setComentario("");
    Comentarios.push({ nombre: nombreUsuario, comentario: Comentario });}
  };

  useEffect(() => {
    const group_name = params.id; // Define the group_name variable
    getPicNName(group_name)
      .then((members) => {
        setMembers(members);
        console.log(members);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
    <div className={styles.everything}>
      <Header user={user}></Header>
      {grupo ? (
        <div className={styles.groupInfo}>
          <section>
            <h1 className={styles.mainTitle}>{params.id}</h1>
            <img
              className={styles.img}
              src={`/${noSpacesString}.jpeg`}
              alt="club"
            />
          </section>
          <section>
            <section className={styles.mission}>
              <h2>Misión</h2>
              <div>{grupo.Mision} </div>
            </section>
            <section className={styles.vision}>
              <h2>Visión</h2>
              <div>{grupo.Vision} </div>
            </section>
          </section>
        </div>
      ) : (
        ""
      )}
      <section className={styles.bothColumns}>
        <section className={styles.leftColumn}>
          <div style={{ margin: "2rem" }}>
            <Paypal></Paypal>
          </div>

          <section style={{ display: "flex", flexDirection: "row" }}>
            {notSubscribed ? (
              ""
            ) : (
              <button
                onClick={handleClickSubscribe}
                className={styles.subcribe}
              >
                +
              </button>
            )}
            {subscrite ? (
              ""
            ) : (
              <button
                onClick={handleClickUnsubscribe}
                className={styles.subcribe}
              >
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
        </section>
        <section className={styles.rightColumn}>
          <div>Integrantes</div>
          {members.map((user) => (
            <MemberInfo nombre={user.nombre} pic={user.pic} />
          ))}
        </section>
      </section>
    </div>
  );
}
export default GroupPage;

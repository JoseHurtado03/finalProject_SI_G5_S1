import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AgregarComentarioGrupo, agregarPersonaGrupo} from "../Controllers/Groups";
import useGrupo from "../CustomHooks/useGroup";
import Comment from "../Components/Comentario";
import Paypal from "../Components/paypal";
import styles from "../CSS/PaginaGrupo.module.css";
import { useUserContext } from "../context/user";
import {getUsuario,subscribe} from "../Controllers/usuario"

function GroupPage() {
  const params = useParams();
  const grupo = useGrupo(params.id);
  const {user, userData} = useUserContext();

  const [Comentarios, setComentarios] = useState();

  const [Comentario, setComentario] = useState("");

  const [subscrito,setSubscrito]=useState(false)

  const [nombreUsuario, setNombreUsuario] = useState("");


  const handleClick = () => {
    AgregarComentarioGrupo(params.id, {
      nombre: nombreUsuario,
      comentario: Comentario,
    });
    setComentario("");
    Comentarios.push({ nombre: nombreUsuario, comentario: Comentario });
  };

  useEffect(()=>{
    if(userData){

        const uwu=async ()=>{
           
            
            const usuario= await getUsuario(user.uid)
            setNombreUsuario(usuario.Nombre +" "+usuario.Apellido);
            
            const gruposUsuario=usuario.subscripciones

            if(gruposUsuario.includes(params.id)){
                setSubscrito(true)
            }
           
           

        }
        
        uwu()
    }

}

,[userData])


  const handleClickSubscribe = () => {
    const uid = user.uid
    subscribe(uid,params.id)
    agregarPersonaGrupo(userData.email,params.id)

    setSubscrito(true)
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (grupo != null) {
      setComentarios(grupo.Comentarios);
    }
  }, [grupo]);

  return (
    <div style={{backgroundColor: "#FF8F50"}}>
      {grupo ? (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
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

    <div style={{margin:"2rem"}}>

        <Paypal></Paypal>
    </div>



      <section style={{display: 'flex', flexDirection: 'row'}}>
          {subscrito? (""):(<button onClick={handleClickSubscribe} className={styles.subcribe}>+</button>)}

        <div >
          <input
            value={Comentario}
            onChange={(e) => setComentario(e.target.value)}
            className={styles.inputMsg}
            placeholder="Ingresa un comentario"
          ></input>
          <button onClick={handleClick} className={styles.sendButton}>Enviar</button>

          




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

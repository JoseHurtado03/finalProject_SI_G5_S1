import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AgregarComentarioGrupo } from "../Controllers/Groups";
import useGrupo from "../CustomHooks/useGroup";
import Comment from "../Components/Comentario";
import style from "../CSS/PaginaGrupo.module.css";
import { useUser } from "../context/user";
import {getUsuario,subscribe} from "../Controllers/usuario"

function GroupPage() {
  const params = useParams();
  const grupo = useGrupo(params.id);
  const user = useUser();

  const [Comentarios, setComentarios] = useState();

  const [Comentario, setComentario] = useState("");

  const [subscrito,setSubscrito]=useState(false)

  const handleClick = () => {
    AgregarComentarioGrupo(params.id, {
      nombre: "Enrique Millan",
      comentario: Comentario,
    });
    setComentario("");
    Comentarios.push({ nombre: "Enrique Millan", comentario: Comentario });
  };

  useEffect(()=>{
    if(user){

        const uwu=async ()=>{
           
            
            const usuario= await getUsuario(user.email)
            
            const gruposUsuario=usuario.subscripciones

            if(gruposUsuario.includes(params.id)){
                setSubscrito(true)
            }
           
           

        }
        
        uwu()
    }

}

,[user])


  const handleClickSubscribe = () => {
    
    subscribe(user.email,params.id)
    setSubscrito(true)
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (grupo != null) {
      setComentarios(grupo.Comentarios);
    }
  }, [grupo]);

  return (
    <>
      {grupo ? (
        <div>
          <h1>{params.id}</h1>
          <div>{grupo.Mision} </div>
          <div>{grupo.Vision} </div>
        </div>
      ) : (
        ""
      )}

        {subscrito? (""):(<button onClick={handleClickSubscribe}>Subscribe</button>)}
        
        



      <div>
        <input
          value={Comentario}
          onChange={(e) => setComentario(e.target.value)}
        ></input>
        <button onClick={handleClick}>enviar</button>

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
    </>
  );
}
export default GroupPage;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AgregarComentarioGrupo } from "../Controllers/Groups";
import useGrupo from "../CustomHooks/useGroup";
import Comment from "../Components/Comentario";
import style from "../CSS/PaginaGrupo.module.css";

function GroupPage() {
  const params = useParams();
  const grupo = useGrupo(params.id);

  const [Comentarios, setComentarios] = useState();

  const [Comentario, setComentario] = useState("");

  const handleClick = () => {
    AgregarComentarioGrupo(params.id, {
      nombre: "Enrique Millan",
      comentario: Comentario,
    });
    setComentario("");
    Comentarios.push({ nombre: "Enrique Millan", comentario: Comentario });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (grupo != null) {
      setComentarios(grupo.Comentarios);
    }
  }, [grupo]);

  return (
    <div>
      {grupo ? (
        <div>
          <h1>{params.id}</h1>
          <div>{grupo.Mision} </div>
          <div>{grupo.Vision} </div>
        </div>
      ) : (
        ""
      )}
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
    </div>
  );
}
export default GroupPage;

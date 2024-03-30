import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmail,
  SingInwithEmail,
  singInGoogle,
  singOut,
} from "../Controllers/auth";
import { useUser } from "../context/user";
import { createUser,buscarUsuarioPorId } from "../Controllers/usuario";
import styles from "../CSS/SignIn.module.css";
import { Link } from "react-router-dom";

export default function Sign() {

  function separarNombreApellido(nombreCompleto) {
    const partes = nombreCompleto.split(" "); // Divide la cadena en un array de substrings separados por espacios
    const nombre = partes[0]; // El primer elemento es el nombre
    const apellido = partes.slice(1).join(" "); // Los elementos restantes son el apellido
    return { nombre, apellido };
  }



  const navigate = useNavigate();
  const user = useUser();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("regular");

  const handleSignin = async (e) => {
    const user = await createUserWithEmail(email, password);
    if (user != null) {
      let role = "regular";
      if (userType === "admin") {
        role = "admin";
      }
      await createUser(name, lastName, username, email, password, role);
      navigate("/");
    } else {
      alert("Todos los campos son obligatorios");
    }
  };

  const handleLogingGoogle = async (e) => {
    const user = await singInGoogle();
            
  };

  useEffect(() => {
    if (user) {
      const comprove = async (id) => {
        const nuevo = await buscarUsuarioPorId(id);

        if (nuevo) {
          console.log("es nuebo");
          //activar despues
          navigate("/");
        } else {
          const NombreApellido = separarNombreApellido(user.displayName);

          const crear = async () => {
            await createUser(
              NombreApellido.nombre,
              NombreApellido.apellido,
              "username",
              user.email,
              "password"
            );
          };

          crear();

          //activar despues
          navigate("/");
        }
      };
      comprove(user.email);
      // navigate("/AppPage")
    }
  }, [user, navigate]);


  return (
    <div
      className="all"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <section
        className="fields"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "100px",
          marginRight: "50px",
        }}
      >
        <h1 className={styles.mainTitle}>Registro</h1>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          placeholder="Nombre"
        ></input>

        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={styles.input}
          placeholder="Apellido"
        ></input>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          placeholder="Nombre de Usuario"
        ></input>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          placeholder="Correo Electrónico"
        ></input>

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="Contraseña"
        ></input>

        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className={styles.input}
        >
          <option value="regular">Usuario Regular</option>
          <option value="admin">Admin</option>
        </select>


        <section
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <button onClick={handleSignin} className={styles.mainButton}>
            SIGN IN
          </button>
        </section>
        <button className={styles.Google} onClick={handleLogingGoogle}>Registrate con Google</button>
        <Link to={"/Login"} style={{ marginTop: "20px" }}>
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </section>
      <section className={styles.rightImg}></section>
    </div>
  );
}

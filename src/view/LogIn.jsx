import { useEffect, useState } from "react";
import {
  createUserWithEmail,
  SingInwithEmail,
  singInGoogle,
  singOut,
} from "../Controllers/auth";
import { UserContext, useUserContext } from "../context/user";
import { useNavigate, Link } from "react-router-dom";

import {
  createUser,
  buscarUsuarioPorId,
  getUsuario,
} from "../Controllers/usuario";
import styles from "../CSS/Login.module.css";
import { getAdditionalUserInfo, signInWithPopup } from "@firebase/auth";
import { auth, db, googleProvider } from "../firebase";
import { collection, doc, setDoc } from "@firebase/firestore";

export default function Login() {
  const navigate = useNavigate();
  const { user, userData } = useUserContext();
  //const usuario = useUser();

  function separarNombreApellido(nombreCompleto) {
    const partes = nombreCompleto.split(" "); // Divide la cadena en un array de substrings separados por espacios
    const nombre = partes[0]; // El primer elemento es el nombre
    const apellido = partes.slice(1).join(" "); // Los elementos restantes son el apellido
    return { nombre, apellido };
  }

  useEffect(() => {
    if (userData) {
      console.log(userData, "sqwsw");
      if (userData.role == "admin") {
        navigate("/Admin");
      } else if (userData.role == "regular") {
        navigate("/");
      } else {
        const comprove = async (id) => {
          const nuevo = await buscarUsuarioPorId(id);

          if (nuevo) {
            console.log("es nuevo");
            //activar despues
            navigate("/");
          }
          // else {
          //   const NombreApellido = separarNombreApellido(user.displayName);

          //   const crear = async () => {
          //     await createUser(
          //       NombreApellido.nombre,
          //       NombreApellido.apellido,
          //       "username",
          //       userData.email,
          //       "password"
          //     );
          //   };

          //   crear();

          //   //activar despues
          //   navigate("/");
          // }
        };
        comprove(userData.email);
        // navigate("/AppPage")
      }
    }
  }, [userData, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [tiporol, settiporol] = useState("")

  const handleLogin = async (e) => {
    const user = await SingInwithEmail(email, password);
    //const usuario= await getUsuario(user.email)
    // if (usuario) {
    //   console.log(usuario.role)
    //   settiporol(usuario.role);
    // }
  };

  async function handleClick() {
    console.log("googlelogin");
    const result = await signInWithPopup(auth, googleProvider);
    const coleccionUsuario = collection(db, "Usuarios");
    const infoRelativaU = await getAdditionalUserInfo(result);

    if (infoRelativaU.isNewUser) {
      const fullName = result.user.displayName;
      const namesArray = fullName.split(" ");

      const firstName2 = namesArray[0];
      const lastName2 = namesArray.slice(1).join(" ");

      const email = result.user.email;
      const emailArray = email.split("@");

      const username2 = emailArray[0];

      await setDoc(doc(coleccionUsuario, result.user.uid), {
        Apellido: lastName2,
        Nombre: firstName2,
        UserName: username2,
        email: result.user.email,
        password: "contrasena",
        role: "regular",
        subscripciones: [],
      });
      //setUserData(result.user);
      console.log(result.user);
      //const [user, setUser] =  useState(result.user)
    } else {
      console.log("LOGIN FAILED, Try Again usuario registrado previamente");
    }
  }

  const handleLogingGoogle = async (e) => {
    const user = await singInGoogle();
    console.log(user);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <section className={styles.leftImg}></section>
      <section className={styles.rightColumn} style={{ marginLeft: "50px" }}>
        <h1 className={styles.mainTitle}>Inicio de Sesión</h1>
        <section className={styles.fields}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo Electronico"
            className={styles.input}
          ></input>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contrasena"
            className={styles.input}
          ></input>
        </section>
        <section style={{ marginBottom: "50px" }}>
          <button onClick={handleLogin} className={styles.mainButton}>
            LogIn
          </button>

          <button onClick={handleClick} className={styles.Google}>
            <img src="/Google.png" alt="club" />
            Inicio con Google
          </button>

          <button onClick={handleBack} className={styles.homeButton}>
            Regresar
          </button>
        </section>
        <Link to={"/SignIn"}>¿No tienes una cuenta? Regístrate</Link>
      </section>
    </div>
  );
}

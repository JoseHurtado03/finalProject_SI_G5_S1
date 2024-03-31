import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmail,
  SingInwithEmail,
  singInGoogle,
  singOut,
} from "../Controllers/auth";
import { useUserContext } from "../context/user";
import { createUser, buscarUsuarioPorId } from "../Controllers/usuario";
import styles from "../CSS/SignIn.module.css";
import { Link } from "react-router-dom";
import { getAdditionalUserInfo, signInWithPopup } from "@firebase/auth";
import { collection, doc, setDoc } from "@firebase/firestore";
import { auth, db, googleProvider } from "../firebase";

export default function Sign() {
  function separarNombreApellido(nombreCompleto) {
    const partes = nombreCompleto.split(" "); // Divide la cadena en un array de substrings separados por espacios
    const nombre = partes[0]; // El primer elemento es el nombre
    const apellido = partes.slice(1).join(" "); // Los elementos restantes son el apellido
    return { nombre, apellido };
  }

  const navigate = useNavigate();
  const { user, userData } = useUserContext();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("regular");

  const handleSignin = async (e) => {
    const user = await createUserWithEmail(email, password);
    const uid = user.user.uid;
    console.log(uid);
    if (user != null) {
      let role = "regular";
      if (userType === "admin") {
        role = "admin";
      }
      await createUser(name, lastName, username, email, password, role, uid);
      navigate("/");
    } else {
      alert("Todos los campos son obligatorios");
    }
  };

  const handleGoogleClick = async () => {
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

      const [user, setUser] = useState(result.user);
    } else {
      console.log("LOGIN FAILED, Try Again usuario registrado previamente");
    }
  };

  const handleLogingGoogle = async (e) => {
    const user = await singInGoogle();
  };

  useEffect(() => {
    if (userData) {
      const comprove = async (id) => {
        if (userData.role == "admin") {
          navigate("/Admin");
        } else if (userData.role == "regular") {
          navigate("/");
        }
        //const nuevo = await buscarUsuarioPorId(id);

        // if (nuevo) {
        //   console.log("es nuebo");
        //   //activar despues
        //   navigate("/");
        // } else {
        //   const NombreApellido = separarNombreApellido(user.displayName);

        //   const crear = async () => {
        //     await createUser(
        //       NombreApellido.nombre,
        //       NombreApellido.apellido,
        //       "username",
        //       user.email,
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
  }, [userData, navigate]);

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
          type="password"
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
            Sign in
          </button>
        </section>
        <button className={styles.Google} onClick={handleGoogleClick}>
          <img src="/Google.png" alt="club" />
          Registrate con Google
        </button>
        <Link to={"/Login"} style={{ marginTop: "20px" }}>
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </section>
      <section className={styles.rightImg}></section>
    </div>
  );
}

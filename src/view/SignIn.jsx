import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmail,
  SingInwithEmail,
  singInGoogle,
  singOut,
} from "../Controllers/auth";
import { useUser } from "../context/user";
import { createUser } from "../Controllers/usuario";
import styles from '../CSS/SignIn.module.css'


export default function Sign() {
  const navigate = useNavigate();
  const user = useUser();
  

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");




  const handleSignin = async (e) => {
    const user = await createUserWithEmail(email, password);
    if (user != null) {
      await createUser(name, lastName, username, email, password);
    } else {
      alert("Todos los campos son obligatorios");
    }
  };

  const handleLogingGoogle = async (e) => {
    const user = await singInGoogle();

    console.log(user);
  };

  useEffect(() => {
    if (user) {
        //activar despues 
    //   navigate("/");
    }
  }, [user, navigate]);

  const handleMostrarOcultarJuegos = () => {
    setMostrarJuegos(!mostrarJuegos);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <section style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '100px'}}>
        <h1 className={styles.mainTitle}>Registrarse</h1>
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
          placeholder="Correo Electronico"
        ></input>

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="Contrasena"
        ></input>
        <section style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <button onClick={handleSignin} className={styles.mainButton}>SIGN IN</button>
          <button>Registrate con Google</button>
        </section>
        <h3>Ya tienes una cuenta? Inicia sesion</h3>
      </section>
      <section className={styles.rightImg}></section>
    </div>
  );
}

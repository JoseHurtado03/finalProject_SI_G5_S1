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
    <div >
      <h1 >Nombre</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
       
      ></input>

      <h1 >Apellido</h1>
      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        
      ></input>

      <h1 >UserName</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
    
      ></input>

      <h1 >Email</h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
    
      ></input>

      <h1 >Password</h1>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        
      ></input>

   
        
    
      <button onClick={handleSignin} >
        SIGN
      </button>
    </div>
  );
}

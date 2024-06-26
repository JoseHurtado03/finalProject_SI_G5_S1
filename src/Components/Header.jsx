import { useState, useEffect } from "react";
import styles from "../CSS/Header.module.css";
import { useNavigate, Link } from "react-router-dom";

import { singOut } from "../Controllers/auth";
import { useUserContext } from "../context/user";

function Header({ user }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    singOut();
    window.location.reload();
  };
  const {userData} = useUserContext()
  useEffect(() => {
    if (userData) {
      if (userData.role == "admin") {
        navigate("/Admin");
      }}}, [userData, navigate]);

  return (
    <header className={styles.header}>
      {user ? (
        <div className={styles.main}>
          <Link to={"/"} className={styles.logo}></Link>
          <Link to={"/"} className={styles.text}>
            Inicio
          </Link>
          <Link to={"/SignIn"} className={styles.text}>
            Sign
          </Link>
          <Link to={"/Login"} className={styles.text}>
            LogIn
          </Link>
          <Link to={"/Search"} className={styles.text}>
            🔎
          </Link>
          <Link to={"/PefilUsuario"} className={styles.text}>
            Perfil
          </Link>
          <button className={styles.logout} onClick={handleLogout}>
            Log Out
          </button>
        </div>
      ) : (
        <div className={styles.main}>
          <Link to={"/"} className={styles.logo}></Link>
          <Link to={"/"} className={styles.text}>
            Inicio
          </Link>
          <Link to={"/SignIn"} className={styles.text}>
            Sign
          </Link>
          <Link to={"/Login"} className={styles.text}>
            LogIn
          </Link>
          <Link to={"/Search"} className={styles.text}>
            🔎
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;

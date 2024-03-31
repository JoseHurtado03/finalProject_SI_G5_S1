import { useState, useEffect } from "react";
import styles from "../CSS/GroupCard.module.css";
import { useNavigate } from "react-router-dom";

function GroupCard({ nombre, mision, vision }) {
  const navigate = useNavigate();
  const HandleClick = () => {
    navigate(`/GroupPage/${nombre}`);
  };

  return (
    <div className={styles.carta} onClick={HandleClick}>
      <h1>{nombre}</h1>
      <div>{mision} </div>
      <div>{vision} </div>
    </div>
  );
}

export default GroupCard;

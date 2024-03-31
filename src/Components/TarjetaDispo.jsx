import { useNavigate } from "react-router-dom";
import styles from "../CSS/TarjetaDispo.module.css";

function GroupCard({ nombre, dispo }) {
  const navigate = useNavigate();
  const noSpacesString = nombre.replace(/\s/g, "");
  const HandleClick = () => {
    navigate(`/GroupPage/${nombre}`);
  };

  return (
    <div className={styles.carta} onClick={HandleClick}>
      <section className={styles.info}>
        <div className={styles.text}>{nombre}</div>
        <div style={{ marginTop: "50px" }}>{dispo}/30 </div>
      </section>
      <img src={`/${noSpacesString}.jpeg`} alt="club" />
    </div>
  );
}

export default GroupCard;

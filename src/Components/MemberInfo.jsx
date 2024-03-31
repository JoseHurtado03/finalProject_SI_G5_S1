import { useNavigate } from "react-router-dom";
import styles from "../CSS/MemberInfo.module.css";

function MemberInfo({ nombre, pic }) {
  return (
    <div>
      <section className={styles.info}>
        <img className={styles.img} src={pic} alt="user" />
        <div className={styles.text}>{nombre}</div>
      </section>
    </div>
  );
}

export default MemberInfo;

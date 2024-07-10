import { useNavigate } from "react-router-dom";
import leftArrow from "../icons/arrow-left-solid.svg";
import options from "../icons/vertical-dots.svg";

type NavBarProps = {};

const styles = {
  container: "p-4 bg-green-400 flex justify-between",
  icons: "w-5 h-5 cursor-pointer",
};

const NavBar: React.FC<NavBarProps> = ({}) => {
  const navigate = useNavigate();
  return (
    <nav className={styles.container}>
      <img
        src={leftArrow}
        className={styles.icons}
        onClick={() => navigate(-1)}
      />
      <img src={options} className={styles.icons} />
    </nav>
  );
};

export default NavBar;

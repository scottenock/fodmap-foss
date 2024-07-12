import { Link, useNavigate } from "react-router-dom";
import leftArrow from "../icons/arrow-left-solid.svg";
import options from "../icons/vertical-dots.svg";
import { useEffect, useRef, useState } from "react";

type NavBarProps = {
  goesHome?: boolean;
};

const styles = {
  container: "px-4 py-5 bg-green-400 flex justify-between",
  icons: "w-5 h-5 cursor-pointer",
  links: "block px-5 py-3 ",
};

const NavBar: React.FC<NavBarProps> = ({ goesHome = true }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setShowMenu(true);
  };

  useEffect(() => {
    ref.current && ref.current.focus();
  }, [showMenu]);

  return (
    <nav className={styles.container}>
      <img
        src={leftArrow}
        className={styles.icons}
        onClick={() => (goesHome ? navigate("/") : navigate(-1))}
      />
      <div className="relative">
        <img src={options} className={styles.icons} onClick={handleClick} />
        <div
          tabIndex={0}
          ref={ref}
          onBlur={() => setShowMenu(false)}
          className={`bg-white absolute right-2 top-0 border-2 ${
            showMenu ? "" : "hidden"
          }`}
        >
          <Link
            onMouseDown={(e) => e.preventDefault()}
            className={styles.links}
            to="/About"
          >
            About
          </Link>
          <Link
            onMouseDown={(e) => e.preventDefault()}
            className={styles.links}
            to="/donate"
          >
            Donate
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

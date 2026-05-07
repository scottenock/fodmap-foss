import { Link, useNavigate } from "react-router-dom";
import leftArrow from "../icons/arrow-left-solid.svg";
import options from "../icons/vertical-dots.svg";
import { useEffect, useRef, useState } from "react";

type NavBarProps = {
  className?: string;
  goesHome?: boolean;
  children?: React.ReactNode;
  title?: string;
};

const NavBar: React.FC<NavBarProps> = ({
  className = "",
  goesHome = true,
  children,
  title,
}) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current && ref.current.focus();
  }, [showMenu]);

  return (
    <nav className={`px-4 py-3 bg-green-400 shadow-bottom flex justify-between items-center gap-2 ${className}`}>
      <button
        aria-label="Go back"
        className="p-1 shrink-0 active:opacity-70 transition-opacity"
        onClick={() => (goesHome ? navigate("/") : navigate(-1))}
      >
        <img src={leftArrow} className="w-5 h-5" />
      </button>

      <div className="flex-1 flex items-center justify-center min-w-0">
        {children ?? (title && (
          <p className="text-white font-semibold text-base truncate">{title}</p>
        ))}
      </div>

      <div className="relative shrink-0">
        <button
          aria-label="More options"
          className="p-1 active:opacity-70 transition-opacity"
          onClick={() => setShowMenu(true)}
        >
          <img src={options} className="w-5 h-5" />
        </button>
        <div
          tabIndex={0}
          ref={ref}
          onBlur={() => setShowMenu(false)}
          className={`bg-white dark:bg-gray-800 absolute right-0 top-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden min-w-[130px] z-50 ${showMenu ? "" : "hidden"}`}
        >
          <Link
            onMouseDown={(e) => e.preventDefault()}
            className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700"
            to="/about"
          >
            About
          </Link>
          <Link
            onMouseDown={(e) => e.preventDefault()}
            className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700"
            to="/donate"
          >
            Donate
          </Link>
          <Link
            onMouseDown={(e) => e.preventDefault()}
            className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            to="/settings"
          >
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

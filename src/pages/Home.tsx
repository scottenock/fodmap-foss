import { Link } from "react-router-dom";
import logo from "../icons/logo.png";

const SearchIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
  </svg>
);
const CalendarIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const StarIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);
const ChartIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

type NavCardProps = {
  to: string;
  state?: object;
  icon: React.ReactNode;
  label: string;
  description: string;
  iconBg: string;
  iconColor: string;
};

const NavCard: React.FC<NavCardProps> = ({ to, state: linkState, icon, label, description, iconBg, iconColor }) => (
  <Link
    to={to}
    state={linkState}
    className="bg-background-primary rounded-2xl p-4 shadow-sm border border-divider flex flex-col gap-3 active:scale-95 transition-transform"
  >
    <div className={`w-10 h-10 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center`}>
      {icon}
    </div>
    <div>
      <p className="font-semibold text-foreground-primary text-sm">{label}</p>
      <p className="text-xs text-foreground-muted mt-0.5">{description}</p>
    </div>
  </Link>
);

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-green-400 px-6 pt-14 pb-20 flex flex-col items-center">
        <img className="w-20 h-20 rounded-3xl shadow-xl mb-5" src={logo} alt="FODMAP FOSS" />
        <h1 className="text-2xl font-bold text-white tracking-tight">FODMAP FOSS</h1>
        <p className="text-green-100 text-sm mt-1">Free & Open Source</p>
      </div>

      <div className="px-4 -mt-8 flex-1 flex flex-col pb-8">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <NavCard to="/food"   icon={<SearchIcon />}   label="Search Foods" description="Browse FODMAP database"  iconBg="bg-green-100"  iconColor="text-green-600" />
          <NavCard to="/track"  icon={<CalendarIcon />} label="Track"        description="Log meals & symptoms"    iconBg="bg-blue-100"   iconColor="text-blue-600" />
          <NavCard to="/food" state={{ showFavoritesOnly: true }} icon={<StarIcon />} label="Favorites" description="Your saved foods" iconBg="bg-amber-100" iconColor="text-amber-600" />
          <NavCard to="/analysis" icon={<ChartIcon />}  label="Analysis"     description="Symptom insights"        iconBg="bg-purple-100" iconColor="text-purple-600" />
        </div>
        <div className="grid grid-cols-3 gap-3 mt-auto pt-2">
          {[
            { to: "/about",    label: "About"    },
            { to: "/donate",   label: "Donate"   },
            { to: "/settings", label: "Settings" },
          ].map(({ to, label }) => (
            <Link key={to} to={to} className="text-center py-3 text-sm text-foreground-secondary bg-background-primary border border-divider rounded-xl shadow-sm">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

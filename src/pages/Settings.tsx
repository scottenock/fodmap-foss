import { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import AppContext, { ACTIONS, ThemePreference } from "../context/AppContext";

type ThemeOption = { value: ThemePreference; label: string; icon: React.ReactNode };

const SystemIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path strokeLinecap="round" d="M8 21h8M12 17v4" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const THEME_OPTIONS: ThemeOption[] = [
  { value: "system", label: "Auto",  icon: <SystemIcon /> },
  { value: "light",  label: "Light", icon: <SunIcon /> },
  { value: "dark",   label: "Dark",  icon: <MoonIcon /> },
];

const DownloadIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

function Settings() {
  const { state, dispatch } = useContext(AppContext);
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      version: "1",
      meals: state.meals,
      symptoms: state.symptoms,
      favorites: state.favorites,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fodmap-data-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <div className="pb-8">
      <NavBar title="Settings" />

      <div className="px-4 pt-4 space-y-4">

        <section>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 px-1 mb-2">
            Appearance
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Dark Mode</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Choose your preferred colour scheme</p>
              </div>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-3 gap-2">
                {THEME_OPTIONS.map(({ value, label, icon }) => {
                  const active = state.themePreference === value;
                  return (
                    <button
                      key={value}
                      onClick={() => dispatch({ type: ACTIONS.SET_THEME, payload: value })}
                      className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-sm font-medium transition-colors ${
                        active
                          ? "bg-green-400 text-white border-green-400"
                          : "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600"
                      }`}
                    >
                      {icon}
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 px-1 mb-2">
            Data
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Export Data</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                Download your meals, symptoms, and favourites as a JSON file
              </p>
            </div>
            <div className="px-4 py-4">
              <button
                onClick={handleExport}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-colors ${
                  exported
                    ? "bg-green-400 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                }`}
              >
                {exported ? (
                  "✓ Exported!"
                ) : (
                  <>
                    <DownloadIcon />
                    Export as JSON
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Settings;

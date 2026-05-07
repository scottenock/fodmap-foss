import { HashRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import About from "./pages/About";
import Donate from "./pages/Donate";
import FoodDetail from "./pages/FoodDetail";
import Foods from "./pages/Foods";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Track from "./pages/Track";
import SymptomAnalysis from "./pages/SymptomAnalysis";
import TriggerFoods from "./pages/TriggerFoods";

function App() {
  return (
    <div className="max-w-screen-sm mx-auto">
      <AppProvider>
        <HashRouter>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/about" Component={About} />
            <Route path="/donate" Component={Donate} />
            <Route path="/food" Component={Foods} />
            <Route path="/food/:id" Component={FoodDetail} />
            <Route path="/track" Component={Track} />
            <Route path="/analysis" Component={SymptomAnalysis} />
            <Route path="/analysis/triggers" Component={TriggerFoods} />
            <Route path="/settings" Component={Settings} />
          </Routes>
        </HashRouter>
      </AppProvider>
    </div>
  );
}

export default App;

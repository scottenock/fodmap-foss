import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import About from "./pages/About";
import Donate from "./pages/Donate";
import FoodInfo from "./pages/FoodInfo";
import Foods from "./pages/Foods";
import Home from "./pages/Home";

function App() {
  return (
    <div className="max-w-screen-sm mx-auto">
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/about" Component={About} />
            <Route path="/donate" Component={Donate} />
            <Route path="/food" Component={Foods} />
            <Route path="/food/:id" Component={FoodInfo} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import FoodInfo from "./pages/FoodInfo";
import Foods from "./pages/Foods";

function App() {
  return (
    <div className="max-w-screen-sm mx-auto">
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Foods} />
            <Route path="/food/:id" Component={FoodInfo} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;

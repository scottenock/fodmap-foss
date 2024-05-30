import { BrowserRouter, Routes, Route } from "react-router-dom";
import Foods from "./pages/Foods";
import FoodInfo from "./pages/FoodInfo";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Foods} />
          <Route path="/food/:id" Component={FoodInfo} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Foods from "./pages/Foods";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Foods} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

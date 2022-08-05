import { BrowserRouter, Routes, Route } from "react-router-dom";

import GetStarted from "./pages/getStarted";
import Signup from "./pages/signup";

import "./assets/reset.css";
import "./assets/style.css";

function App() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<GetStarted />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    );
  }
  
export default App;
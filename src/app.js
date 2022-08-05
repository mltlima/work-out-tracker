import { BrowserRouter, Routes, Route } from "react-router-dom";

import GetStarted from "./pages/getStarted";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import AlertProvider from "./contexts/alertContext.js";
import AuthProvider from "./contexts/authContext.js";

import "./assets/reset.css";
import "./assets/style.css";

function App() {
    return (
        <AlertProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<GetStarted />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/signin" element={<Signin />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </AlertProvider>
    );
  }
  
export default App;
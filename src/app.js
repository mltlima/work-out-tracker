import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";

import GetStarted from "./pages/getStarted";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import AlertProvider from "./contexts/alertContext.js";
import AuthProvider from "./contexts/authContext.js";
import UserInfoProvider from "./contexts/userInfoContext.js";
import CompleteProfile from "./pages/completeProfile.js";

//import "./assets/reset.css";
//import "./assets/style.css";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AlertProvider>
                <AuthProvider>
                    <UserInfoProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<GetStarted />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/signin" element={<Signin />} />
                                <Route path="/completeProfile" element={<CompleteProfile />} />
                            </Routes>
                        </BrowserRouter>
                    </UserInfoProvider>
                </AuthProvider>
            </AlertProvider>
        </ThemeProvider>
    );
  }

const theme = createTheme({
    palette: {
        primary: {main: "#96B3FE"},
        secondary: { main: "#5a81e5" },
        background: { default: "#FFFFFF", paper: "#f5f5f5" },
    },
});

export default App;
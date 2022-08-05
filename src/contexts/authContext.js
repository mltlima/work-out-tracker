import { createContext, useState } from "react";

export const AuthContext = createContext(null);
const LOCAL_STORAGE_KEY = "auth-token";
const persistedAuthToken = localStorage.getItem(LOCAL_STORAGE_KEY);

export default function AuthProvider(Props) {
    const {children} = Props;
    const [authToken, setAuthToken] = useState(persistedAuthToken);

    function signIn(token) {
        setAuthToken(token);
        localStorage.setItem(LOCAL_STORAGE_KEY, token);
    }

    function signOut() {
        setAuthToken(null);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }

    return (
        <AuthContext.Provider value={{authToken, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}
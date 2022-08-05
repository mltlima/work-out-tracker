import { createContext, useState } from "react";

export const AlertContext = createContext(null);

export default function AlertProvider(Props) {
    const {children} = Props;
    const [alert, setAlert] = useState(null);

    function handleClose() {
        setAlert(null);
    }

    return (
        <AlertContext.Provider value={{alert, setAlert, handleClose}}>
            {children}
        </AlertContext.Provider>
    );
}
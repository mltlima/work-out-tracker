import { createContext, useState } from "react";

export const AlertContext = createContext(null);

export default function AlertProvider(props) {
    const {children} = props;
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
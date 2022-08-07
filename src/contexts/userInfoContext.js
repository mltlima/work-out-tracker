import { createContext, useState } from "react";

export const UserInfoContext = createContext(null);

export default function UserInfoProvider(Props) {
    const {children} = Props;
    const [userInfo, setUserInfo] = useState(null);

    function handleClose() {
        setUserInfo(null);
    }

    return (
        <UserInfoContext.Provider value={{userInfo, setUserInfo, handleClose}}>
            {children}
        </UserInfoContext.Provider>
    );
}
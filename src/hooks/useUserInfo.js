import { useContext } from "react";
import { UserInfoContext } from "../contexts/userInfoContext.js";

export default function useUserInfo() {
    const userInfoContext = useContext(UserInfoContext);
    if (!UserInfoContext) {
        throw new Error("useAlert must be used inside a UserInfoContext Provider");
    }
  
    return userInfoContext;
}
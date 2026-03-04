import { createContext, useContext, useEffect, useState } from "react";

const CurrentUserContext = createContext();

export const CurrentUserProvider = ({children}) => {
    const [currentUserId, setCurrentUserId] = useState(null);


    return (
    <CurrentUserContext.Provider value={{ currentUserId, setCurrentUserId }}>
        {children}
    </CurrentUserContext.Provider>)


}

export const useCurrentUser = () => {
    return useContext(CurrentUserContext);
}
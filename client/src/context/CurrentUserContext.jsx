import { createContext, useContext, useEffect, useState } from "react";

const CurrentUserContext = createContext();

export const CurrentUserProvider = ({children}) => {
    const [currentUserId, setCurrentUserId] = useState(1);
    const [trackedAnimals, setTrackedAnimals] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const fetchTrackedAnimals = async (userId) => {
        if(!userId) return;
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/users/${userId}/tracked-animals`);
            if(!response.ok) {
                throw new Error(`Fetch tracked animals failed (${response.status})`);
            }
            const data = await response.json();
            console.log("tracked animals are : ", data);
            setTrackedAnimals(data);
        } catch(err) {
            setError(err.message || "Unknown error");

        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchTrackedAnimals(currentUserId);
    }, [currentUserId]);

    const value = {
        currentUserId,
        setCurrentUserId,
        trackedAnimals,
        loading,
        error,
        fetchTrackedAnimals
    }
    



    return (
    <CurrentUserContext.Provider value={ value }>
        {children}
    </CurrentUserContext.Provider>)


}

export const useCurrentUser = () => {
    return useContext(CurrentUserContext);
}
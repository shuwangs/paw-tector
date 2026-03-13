import { createContext, useContext, useEffect, useState } from "react";
import { getUsers, getUserStats, fetchTrackedAnimals, onDeleteTrackedAnimal} from "../api/userApi.js";

const CurrentUserContext = createContext();

export const CurrentUserProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [trackedAnimals, setTrackedAnimals] = useState([]);
    const [currentUserStats, setCurrentUserStats] = useState({
        animals_tracked: 0,
        total_sightings:0,
        locations: 0
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getTrackedAnimals = async (userId) => {
        if(!userId) return;
        setLoading(true);
        setError(null);   
        try {
            const result = await fetchTrackedAnimals(userId);
            setTrackedAnimals(result);
        } catch(err) {
            setError(err.message || "Unknown error");

        } finally {
            setLoading(false);
        }

    }

    const loadUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getUsers();
            setUsers(res);
        } catch(err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const fetchCurrentUserStats = async (userId) => {
        if(!userId) return;
        setLoading(true);
        setError(null);

        try {
            const res = await getUserStats(userId);
            setCurrentUserStats(res);
        } catch(err) {
            setError(err.message || "Unknown error");

        } finally {
            setLoading(false);
        }

    }


    useEffect(() =>{
        loadUsers();
        fetchCurrentUserStats(currentUserId);
    },[])


    useEffect(() => {
        getTrackedAnimals(currentUserId);
        fetchCurrentUserStats(currentUserId);
    }, [currentUserId]);

    const deleteTrackedAnimal = async (user_id, animal_id) => {
        const userId = Number(user_id);
        const individualId = Number(animal_id);

        setLoading(true);
        setError(null);
        try {
            await onDeleteTrackedAnimal(userId, individualId)

            await getTrackedAnimals(userId);

        } catch(err) {
            setError(err.message || "Unknown error");

        } finally {
            setLoading(false);
        }


    }


    const value = {
        users,
        currentUserId,
        currentUserStats,
        setCurrentUserId,
        getTrackedAnimals,
        trackedAnimals,
        setTrackedAnimals,
        loading,
        error,
        fetchTrackedAnimals,
        deleteTrackedAnimal,
    }
    

    return (
    <CurrentUserContext.Provider value={ value }>
        {children}
    </CurrentUserContext.Provider>)

}

export const useCurrentUser = () => {
    const ctx =useContext(CurrentUserContext);
    if(! ctx) {
        throw new Error("userCurrentUser must be used within a CurrentUserProvider");
    }
    return ctx;
}
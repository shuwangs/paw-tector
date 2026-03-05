import { createContext, useContext, useEffect, useState } from "react";

const CurrentUserContext = createContext();

export const CurrentUserProvider = ({children}) => {
    const [users, setUsers] = useState([]);
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

    useEffect(() =>{
        loadUsers();
    },[])

    useEffect(() => {
        fetchTrackedAnimals(currentUserId);
    }, [currentUserId]);

    const deleteTrackedAnimal = async (user_id, animal_id) => {
        const userId = Number(user_id);
        console.log(userId);
        const individualId = Number(animal_id);

        console.log(animal_id);

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/users/${userId}/tracked-animals/${individualId}`, {
                method: "DELETE"
            })

            if (!response.ok) {
                throw new Error(`Delete tracked animal failed (${response.status})`);
            }
            setTrackedAnimals(prev => {
                return prev.filter((animal) => animal.invidual_id != individualId);
            })

        } catch(err) {
            setError(err.message || "Unknown error");

        } finally {
            setLoading(false);
        }


    }


    const value = {
        users,
        currentUserId,
        setCurrentUserId,
        trackedAnimals,
        loading,
        error,
        fetchTrackedAnimals,
        deleteTrackedAnimal
    }
    



    return (
    <CurrentUserContext.Provider value={ value }>
        {children}
    </CurrentUserContext.Provider>)


}

export const useCurrentUser = () => {
    return useContext(CurrentUserContext);
}
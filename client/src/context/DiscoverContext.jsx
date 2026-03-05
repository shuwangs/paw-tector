import React, {createContext, useContext, useEffect, useState} from "react";

const DiscoverContext = createContext(null);

export const DiscoverProvider = ({children}) => {
    const [sightings, setSightings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 

    const fetchSightings = async () => {    
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/sightings");

            if (!response.ok) {
            throw new Error("fetch sightings error");
            }

            const data = await response.json();
            console.log(data);
            setSightings(data);
        } catch (err) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSightings();
    }, []);

    const value = {
        sightings,
        setSightings,
        loading,
        error,
        fetchSightings,
    };

    return <DiscoverContext.Provider value={value}>{children}</DiscoverContext.Provider>;






}

export const useDiscover = () => {
    const ctx = useContext(DiscoverContext);
    if(! ctx) {
        throw new Error("useDiscover must be used within a DiscoverProvider");
    }
    return ctx;
}
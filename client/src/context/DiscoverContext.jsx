import React, {createContext, useContext, useEffect, useState} from "react";

const DiscoverContext = createContext(null);

export const DiscoverProvider = ({children}) => {
    const [sightings, setSightings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 
    const [stats, setStats ] = useState(null);
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

    const fetchSightingsStats  = async () => {
        const res = await fetch("/api/sightings/stats");
        const data = await res.json();
        console.log(data);
        setStats(data);
    }

    useEffect(() => {
        fetchSightings();
        fetchSightingsStats();
    }, []);

    const value = {
        sightings,
        stats,
        setSightings,
        loading,
        error,
        fetchSightings,
        fetchSightingsStats
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
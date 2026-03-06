import React, {createContext, useContext, useEffect, useState} from "react";
import {getSightingsStats} from '../api/sightingsApi.js'
const DiscoverContext = createContext(null);

export const DiscoverProvider = ({children}) => {
    const [sightings, setSightings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 
    const [stats, setStats ] = useState( 
        {animals_tracked: 0,
        total_sightings: 0,
        total_volunteers: 0,
        locations: 0});

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
        setLoading(true);
        setError(null);
        try {
            const data =  await getSightingsStats()
            console.log(data);

            setStats(data);
        } catch (err) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
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
import React, {createContext, useContext, useEffect, useState} from "react";
import {getSightingsStats, getSightings} from '../api/sightingsApi.js'

const DiscoverContext = createContext(null);

export const DiscoverProvider = ({children}) => {
    const [sightings, setSightings] = useState([]);
    const [displayedSightings, setDisplayedSightings] = useState([]);
    const [page, setPage]= useState(1);
    const [totalPage, setTotalPage] = useState(null);
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
            const result = await getSightings(page);
            console.log(result);
            setSightings(result.data);
            setDisplayedSightings(result.data);
            setTotalPage(() => {
                if (result.totalCount%result.limit === 0) {
                    setTotalPage (result.totalCount/result.limit)
                } else {
                    setTotalPage (Math.floor(result.totalCount/result.limit) + 1) 
                }
            })
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

    const resetDisplayedSightings = () => {
        setDisplayedSightings(sightings);
    };


    useEffect(() => {
        fetchSightings();
        fetchSightingsStats();
    }, [page]);

    useEffect(() => {
        fetchSightingsStats();
    }, []);
    
    const value = {
        sightings,
        stats,
        page, 
        setPage,
        totalPage,
        displayedSightings,
        setDisplayedSightings,
        resetDisplayedSightings,
        setTotalPage,
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
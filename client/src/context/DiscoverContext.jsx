import React, {createContext, useContext, useEffect, useState} from "react";
import {getSightingsStats, getSightings, onSearch} from '../api/sightingsApi.js'

const DiscoverContext = createContext(null);

export const DiscoverProvider = ({children}) => {
    const [sightings, setSightings] = useState([]);
    const [displayedSightings, setDisplayedSightings] = useState([]);
    const [page, setPage]= useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 
    const [stats, setStats ] = useState( 
        {animals_tracked: 0,
        total_sightings: 0,
        total_volunteers: 0,
        locations: 0});
    const [isSearching, setIsSearching] = useState(false);
    const [searchParams, setSearchParams] = useState({
        searchText: "",
        animal_type: "",
        health_status: "",
        start_date: "",
        end_date: "",
        page: page,
        limit: 12
    })
    const fetchSightings = async () => {    
        setLoading(true);
        setError(null);
        try {
            const result = await getSightings(page);
            console.log(result);
            setSightings(result.data);
            setDisplayedSightings(result.data);
            setTotalPage(Math.ceil(result.totalCount / result.limit));
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
    const fetchSearchResult = async (searchParams) => {
        try {
            const result = await onSearch(searchParams);
            
            console.log("search params are: ", searchParams);
            console.log("filtered results in Searchbar:", result);
            setDisplayedSightings(result.data);

            setTotalPage(Math.ceil(result.totalCount / result.limit));

        }catch (err) {
            setError(err.message || "Unknown error");

        }finally {
            setLoading(false);
        }
    }
    
    const resetDisplayedSightings = async () => {
        setDisplayedSightings(sightings);
        setTotalPage(Math.ceil(sightings.length / 12)); 
    };

    useEffect(() => {
        if (isSearching && searchParams) {
            fetchSearchResult({ ...searchParams, page });
        } else {
            fetchSightings();
        }
    }, [ page, isSearching, searchParams]);

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
        isSearching, setIsSearching,
        searchParams, setSearchParams,
        setDisplayedSightings,
        resetDisplayedSightings,
        setTotalPage,
        setSightings,
        loading,
        error,
        fetchSightings,
        fetchSearchResult,
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
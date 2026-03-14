import React, {useState, useEffect, useContext} from 'react';
import SightingCard from './SightingCard.jsx';
import { useDiscover } from "../context/DiscoverContext";
import {FcPrevious, FcNext } from "react-icons/fc";
import './DisplayCard.css';

const SightingsList = () => {
    const {page, setPage, totalPage, displayedSightings, loading, error} = useDiscover();
    if (loading) {
        return <p>Loading sightings...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <div className='discover-lists'>
            <div className='sightingsList-ctn'>
                {displayedSightings.length === 0 ? (
                <p>No sightings found.</p>
                ) : (
                    displayedSightings.map((sighting) => (
                        <SightingCard key={sighting.id} sighting={sighting} />
                    ))
                )}
            </div>
            <div className='pagination-ctn'>
                <button
                disabled={page === 1}
                onClick={()=>setPage(prev => prev - 1)}>
                    <FcPrevious /> </button>
                <span className='pagenumber'>Page: {page} of {totalPage} </span>

                <button 
                disabled={page === totalPage}
                onClick={()=>setPage(prev => prev + 1)}
                >
                    <FcNext />
                </button>
            </div>

        </div>
    )

}

export default SightingsList;
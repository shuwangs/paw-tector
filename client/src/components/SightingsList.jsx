import React, {useState, useEffect, useContext} from 'react';
import SightingCard from './SightingCard.jsx';
import { useDiscover } from "../context/DiscoverContext";
import {FcPrevious, FcNext } from "react-icons/fc";

const SightingsList = () => {
    const {page, setPage, totalPage, sightings, loading, error } = useDiscover();

    return (
        <div className='discover-lists'>
            <div className='sightingsList-ctn'>
                {sightings.map((sighting) => (
                    <SightingCard key={sighting.id} sighting = {sighting} />
                ))}
        
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
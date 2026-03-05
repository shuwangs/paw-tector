import React, {useState, useEffect} from 'react';
import SightingCard from './SightingCard.jsx';
import { useDiscover } from "../context/DiscoverContext";

const SightingsList = () => {
    const { sightings, loading, error } = useDiscover();

    return (
        <div className='sightingsList-ctn'>
            {sightings.map((sighting) => (
                <SightingCard key={sighting.id} sighting = {sighting} />
            ))}
        </div>

    )

}

export default SightingsList;
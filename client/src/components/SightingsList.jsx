import React, {useState, useEffect} from 'react';
import SightingCard from './SightingCard.jsx';

const SightingsList = () => {
    const [sightings, setSightings] = useState([]);

    useEffect(() => {
        const fetchSightings = async () => {
        try {
            const response = await fetch("/api/sightings");

            if (!response.ok) {
            throw new Error("fetch sightings error");
            }

            const data = await response.json();
            console.log(data);
            setSightings(data);
        } catch (err) {
            console.error(err);
        }
        };

        fetchSightings();
    }, []);

    return (
        <div className='sightingsList-ctn'>
            {sightings.map((sighting) => (
                <SightingCard key={sighting.id} sighting = {sighting} />
            ))}
        </div>

    )

}

export default SightingsList;
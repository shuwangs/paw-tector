import React, {useState, useEffect} from 'react';

import { useCurrentUser } from "../context/CurrentUserContext.jsx";
import RecordAnimalCard from './RecordAnimalCard.jsx';

const RecordAnimalsList = () => {
    const { trackedAnimals, loading, error } = useCurrentUser();

    return (
        <div>        
            <div className='myrecord-header'> 
                <h2>My Records 📋 </h2>
                <button> Add New</button>
            </div>
            <div className="tracked-animal-ctn">
                {trackedAnimals.map((trackedAnimal,) => (
                    <RecordAnimalCard key={trackedAnimal.individual_id} animal={trackedAnimal} />
                ))}

            </div>

        </div>

    )

}

export default RecordAnimalsList;
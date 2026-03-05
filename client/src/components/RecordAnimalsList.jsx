import React, {useState, useEffect} from 'react';

import { useCurrentUser } from "../context/CurrentUserContext.jsx";
import RecordAnimalCard from './RecordAnimalCard.jsx';

const RecordAnimalsList = () => {
    const { trackedAnimals, loading, error } = useCurrentUser();

    return (
        <div className="tracked-animal-ctn">
            {trackedAnimals.map((trackedAnimal,) => (
                <RecordAnimalCard key={trackedAnimal.individual_id} animal={trackedAnimal} />
            ))}

        </div>
    )

}

export default RecordAnimalsList;